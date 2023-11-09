import { useEffect, useState } from "react";
import NewModForm from "./NewModForm";
import AnnouncementForm from "./AnnouncementForm";
import ModList from "./ModList";
import Search from "./Search";
import Header from "./Header";
import AnnouncementList from "./AnnouncementList";

function ModPage() {
  const [sessions, setSessions] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeComponent, setActiveComponent] = useState('newMod'); // Setting 'newMod' as the default component

  useEffect(() => {
    fetch('/sessions')
      .then((response) => response.json())
      .then((data) => setSessions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleAddBird(newBird) {
    const updatedArray = [...sessions, newBird];
    setSessions(updatedArray);
  }

  useEffect(() => {
    fetch('/announce')
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function handleAnnouncement(newAnnouncement) {
    const updatedArray = [...announcements, newAnnouncement];
    setAnnouncements(updatedArray);
  }

  const displayedModules = sessions.filter((ses) => {
    if (ses && ses.name) {
      return ses.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
  
  
  useEffect(() => {
    const lastActivePage = localStorage.getItem('activeComponent');
    if (lastActivePage) {
      setActiveComponent(lastActivePage);
    }
  }, []);

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
    localStorage.setItem('activeComponent', component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'newMod':
        return <NewModForm onAddBird={handleAddBird} />;
      case 'A-List':
        return <AnnouncementList announcements={announcements} setAnnouncements={setAnnouncements}/>;
      case 'announcement':
        return <AnnouncementForm handleAnnouncement={handleAnnouncement} />;
      case 'search':
        return (
          <>
            <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ModList displayedModules={displayedModules} />
          </>
        );
      case 'viewSchedules':
        return (
          <>
            <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <ModList displayedModules={displayedModules} />
          </>
        );
      default:
        return <NewModForm onAddBird={handleAddBird} />;
    }
  };
  

  return (
    <main>
      <Header activeComponent={activeComponent} setActiveComponent={changeActiveComponent} />
      {renderComponent()}
    </main>
  );
}

export default ModPage;