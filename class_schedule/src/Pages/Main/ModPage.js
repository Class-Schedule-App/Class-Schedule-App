import { useEffect, useState } from "react";
import NewModForm from "./NewModForm";
import ModList from "./ModList";
import Search from "./Search";
import Header from "./Header";


function ModPage() {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/modules")
      .then((response) => response.json())
      .then((data) => setModules(data)) // Update the state with fetched data
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function handleAddBird(newBird) {
    const updatedArray = [...modules, newBird];
    setModules(updatedArray);
  }

  const displayedModules = modules.filter((mod) => {
    return mod.module_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!modules) return <h1>...loading</h1>;

  return (
    <main>
      <Header />
      <NewModForm onAddBird={handleAddBird} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ModList displayedModules={displayedModules} />
    </main>
  );
}

export default ModPage;
