import type { MaterialCardItem } from "./material-card";
import { MaterialCard } from "./material-card";
export function MaterialGrid({ materials }: { materials: MaterialCardItem[] }) { return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{materials.map((material) => <MaterialCard key={material.id} material={material} />)}</div>; }
