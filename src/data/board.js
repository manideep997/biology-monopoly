export const BOARD_SIZE = 16;

export const tiles = [
  { id: 0, class: "corner go", name: "START", type: "start", description: "Collect $200 as you pass." },
  { id: 1, class: "property biology", name: "Cellular Lab", type: "property", category: "Biology", price: 60, color: "#4CAF50" },
  { id: 2, class: "chance", name: "Discovery", type: "chance", description: "Draw a discovery card." },
  { id: 3, class: "property biology", name: "Genetics Hub", type: "property", category: "Biology", price: 60, color: "#4CAF50" },
  { id: 4, class: "corner jail", name: "Detention", type: "corner", description: "Just visiting." },
  { id: 5, class: "property anatomy", name: "Skeletal Vault", type: "property", category: "Anatomy", price: 100, color: "#F44336" },
  { id: 6, class: "chance", name: "Tax", type: "tax", description: "Pay Research Funding: $50" },
  { id: 7, class: "property anatomy", name: "Neurology Wing", type: "property", category: "Anatomy", price: 120, color: "#F44336" },
  { id: 8, class: "corner parking", name: "Recess", type: "corner", description: "Take a break." },
  { id: 9, class: "property zoology", name: "Safari Zone", type: "property", category: "Zoology", price: 140, color: "#FF9800" },
  { id: 10, class: "property zoology", name: "Aquatic Center", type: "property", category: "Zoology", price: 150, color: "#FF9800" },
  { id: 11, class: "chance", name: "Discovery", type: "chance", description: "Draw a discovery card." },
  { id: 12, class: "corner go-to-jail", name: "To Detention!", type: "action", description: "Go directly to detention." },
  { id: 13, class: "property botany", name: "Greenhouse", type: "property", category: "Botany", price: 200, color: "#9C27B0" },
  { id: 14, class: "property botany", name: "Arboretum", type: "property", category: "Botany", price: 220, color: "#9C27B0" },
  { id: 15, class: "chance", name: "Tax", type: "tax", description: "Pay Lab Fees: $75" },
];
