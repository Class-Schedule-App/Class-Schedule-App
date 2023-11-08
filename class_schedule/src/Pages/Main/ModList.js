import ModCard from "./ModCard";

function ModList({ displayedModules }) {
  
  return (
    <ul className="cards">
      {displayedModules.map((module) => {
        return <ModCard key={module.id} module={module} />;
      })}
    </ul>
  );
}

export default ModList;
