import ModuleCard from "./ModCard";

function ModList({ displayedModules }) {
  
  return (
    <div className="">
        <ul className="cards">
          {displayedModules.map((module) => {
            return <ModuleCard key={module.id} module={module} />;
          })}
        </ul>
    </div>
   
  );
}

export default ModList;
