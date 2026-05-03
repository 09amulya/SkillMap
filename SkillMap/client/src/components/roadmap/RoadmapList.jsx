import RoadmapItem from "./RoadmapItem";

export default function RoadmapList({ roadmap }) {
  return (
    <div>
      {roadmap.map((step, i) => (
        <RoadmapItem
          key={i}
          step={step}
          index={i}
          isLast={i === roadmap.length - 1}
        />
      ))}
    </div>
  );
}