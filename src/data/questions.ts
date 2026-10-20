export interface QuestionCriteria {
  achieved: string[];
  merit: string[];
  excellence: string[];
}

export interface ExamQuestion {
  id: string;
  year: "2025" | "2024" | "2023";
  questionNumber: number;
  title: string;
  contextSummary: string;
  materials: string[];
  materialTypes: string[];
  dataTables?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
    notes?: string;
  }[];
  subQuestions: {
    label: string;
    prompt: string;
    helperHint?: string;
  }[];
  fullPrompt: string;
  scaffoldingChecklist: string[];
  criteria: QuestionCriteria;
  sampleExcellenceAnswer: string;
}

export type PracticeQuestion = ExamQuestion;

export const EXAM_YEARS: { year: "2025" | "2024" | "2023"; label: string; badge: string; description: string }[] = [
  {
    year: "2025",
    label: "2025 External Exam",
    badge: "Official Paper",
    description: "Kayaks, LDPE, Carbon Fibre, Aluminium-Magnesium Alloy Paddles, Sea Water NaCl, and Density Buoyancy.",
  },
  {
    year: "2024",
    label: "2024 External Exam",
    badge: "Official Paper",
    description: "Paper Circuits (Graphite), CO2 Fire Extinguisher, and Harakeke / Muka Natural Polymer Fishing Nets.",
  },
  {
    year: "2023",
    label: "2023 Pilot Exam",
    badge: "Pilot Assessment",
    description: "Smartphone Materials: Cu/Au/Sn circuits, Copper Heat Sinks, Tin Solder, Graphite Terminals, and Li-ion Electrolytes.",
  },
];

export const ALL_EXAM_QUESTIONS: ExamQuestion[] = [
  // ==========================================
  // 2025 EXAM QUESTIONS
  // ==========================================
  {
    id: "2025-q1-kayak-ldpe-carbon-fibre",
    year: "2025",
    questionNumber: 1,
    title: "Question One: Kayak Body – LDPE & Carbon Fibre Sheets",
    contextSummary:
      "Low-density polyethylene (LDPE) is a type of polymer used to make the body of a recreational kayak. A kayak needs to be buoyant and insoluble in water, so it can float with kayakers. A kayaker is also looking for a new high-performance kayak made out of stronger and harder carbon fibre sheets (planes of carbon atoms arranged in layers).",
    materials: ["Low-Density Polyethylene (LDPE)", "Carbon Fibre Sheets"],
    materialTypes: ["Synthetic Polymer", "Covalent Network"],
    subQuestions: [
      {
        label: "(a) Definition",
        prompt: "Define the term polymer.",
      },
      {
        label: "(b) LDPE Structure & Kayak Use",
        prompt:
          "Explain how the structure and bonding of LDPE results in a low-density polymer that is suitable for use in kayaks.",
        helperHint: "Mention branching, packing of chains, intermolecular forces, buoyancy, and flexibility.",
      },
      {
        label: "(c) Carbon Fibre Classification & Properties",
        prompt:
          "Identify the type of material a carbon fibre sheet is (covalent network, ionic, metallic, molecular, or polymer) and explain why the structure and bonding within a carbon fibre sheet results in a kayak that is hard and strong.",
        helperHint: "Describe the carbon planes, strong covalent bonds, and energy needed to break them.",
      },
    ],
    fullPrompt:
      "(a) Define the term polymer.\n\n(b) Explain how the structure and bonding of LDPE results in a low-density polymer that is suitable for use in kayaks.\n\n(c) Identify the type of material a carbon fibre sheet is, and explain why the structure and bonding within a carbon fibre sheet results in a kayak that is hard and strong.",
    scaffoldingChecklist: [
      "Defined polymer as a large molecule made of repeating monomer subunits joined by covalent bonds",
      "Explained LDPE branching preventing tight chain packing, resulting in low density (floats on water)",
      "Identified carbon fibre as a covalent network structure",
      "Linked strong continuous covalent bonds within carbon sheets to hardness, tensile strength, and structural rigidity",
    ],
    criteria: {
      achieved: [
        "Defines polymer as a large molecule made of repeating monomer units.",
        "Identifies carbon fibre as a covalent network.",
        "Lists basic physical properties: LDPE has low density and does not dissolve in water; carbon fibre is hard and strong.",
      ],
      merit: [
        "Explains that LDPE consists of long polymer chains with side-chain branches; these branches prevent chains from packing closely together, giving it low density so it floats on water, and weak intermolecular forces allow flexibility.",
        "Explains that in carbon fibre sheets, carbon atoms are held together by strong, directional covalent bonds within planes, which require high energy to deform or break, making the kayak hard and strong.",
      ],
      excellence: [
        "Comprehensively evaluates how these structural features directly inform the kayak's practical use: LDPE's low density ensures buoyancy (mass per unit volume is lower than water), and its flexible chains absorb impact against rocks without cracking.",
        "Evaluates carbon fibre's continuous 2D planar covalent network, providing maximum strength-to-weight ratio for competitive racing, preventing hull flexion while resisting puncture under high hydrodynamic pressure.",
      ],
    },
    sampleExcellenceAnswer:
      "(a) A polymer is a large macromolecule composed of many small, repeating structural units (monomers) linked together by strong covalent bonds in long chains.\n\n(b) LDPE is a synthetic polymer composed of long hydrocarbon chains with extensive side-chain branching. Because of these irregular branches, the polymer chains cannot pack closely or uniformly together in a crystalline arrangement. This loose packing results in fewer atoms per unit volume, producing a low density (approx. 0.92 g/cm³), which is lower than the density of water (~1.0 g/cm³). Consequently, an LDPE kayak is naturally buoyant and floats easily. Furthermore, the large distance between chains means the intermolecular forces between adjacent chains are weak, allowing the polymer chains to flex and absorb mechanical impact from waves and submerged rocks without cracking or leaking.\n\n(c) A carbon fibre sheet is a covalent network material. Within each plane, carbon atoms are bonded to each other by strong, directional covalent bonds in a continuous hexagonal 3D network. Breaking or scratching this structure requires overcoming a vast network of strong covalent bonds, which demands immense mechanical energy. When multiple sheets are layered, the rigid covalent bonds throughout the planes provide exceptional tensile strength and hardness. This prevents the kayak hull from flexing under heavy paddling loads, maintaining a streamlined shape through the water while resisting scratches and structural puncture.",
  },
  {
    id: "2025-q2-kayak-paddle-alloys",
    year: "2025",
    questionNumber: 2,
    title: "Question Two: Kayak Paddle – Aluminium & Magnesium Alloys",
    contextSummary:
      "The shaft of a kayak paddle is formed of a long, hollow tube. It needs to: float if it is dropped into the water, be hard enough to pull the blades through the water, and be light enough for a kayaker to lift and use repeatedly.",
    materials: ["Pure Aluminium", "Aluminium & Magnesium Alloy", "Steel (Iron & Carbon Alloy)"],
    materialTypes: ["Metallic Solid", "Metallic Alloy", "Metallic Alloy"],
    dataTables: [
      {
        title: "Table 1: Density and hardness of substances",
        headers: ["Substance", "Density (g/cm³)", "Relative Hardness"],
        rows: [
          ["Pure aluminium", "2.7 g/cm³", "Low"],
          ["Aluminium and magnesium alloy", "2.60–2.7 g/cm³", "Medium"],
          ["Steel (iron and carbon alloy)", "7.75 g/cm³", "High"],
        ],
        notes: "Note: The paddle needs to float if dropped, be hard enough to pull water, and be light to lift.",
      },
    ],
    subQuestions: [
      {
        label: "(a) Aluminium Classification & Malleability",
        prompt:
          "Identify the type of material aluminium, Al, is, and explain how the structure and bonding of aluminium allow it to be malleable, forming the long, hollow tube of the shaft.",
        helperHint: "Mention cations in regular layers sliding past each other without breaking non-directional metallic bonds.",
      },
      {
        label: "(b) Alloy Definition & Mechanism",
        prompt:
          "Define the term alloy, and explain how adding magnesium, Mg, to aluminium, Al, to make an alloy, changes the malleability of the material.",
        helperHint: "Different-sized atoms disrupt regular rows of cations, making it harder for layers to slide.",
      },
      {
        label: "(c) Material Selection Justification",
        prompt:
          "Using the information in Table 1 and your knowledge of structure and bonding, discuss why an aluminium and magnesium alloy would be preferred over both pure aluminium and steel as the material used for kayak paddles.",
        helperHint: "Compare density (buoyancy & fatigue) and hardness (paddle flexion vs deformation) for all 3 materials.",
      },
    ],
    fullPrompt:
      "(a) Identify the type of material aluminium is, and explain how its structure and bonding allow it to be malleable, forming the hollow tube of the paddle shaft.\n\n(b) Define the term alloy, and explain how adding magnesium to aluminium changes the malleability of the material at the particle level.\n\n(c) Using Table 1, discuss why an aluminium and magnesium alloy is preferred over BOTH pure aluminium and steel for kayak paddles.",
    scaffoldingChecklist: [
      "Identified aluminium as a metallic solid",
      "Explained malleability via regular layers of cations sliding while delocalised electrons maintain non-directional metallic bonding",
      "Defined alloy as a mixture of a metal with one or more other elements",
      "Explained alloy hardening: different-sized solute atoms disrupt regular cation rows, preventing layers from sliding",
      "Evaluated Table 1 data: Al-Mg alloy has low density (2.6-2.7 g/cm³) preventing kayaker fatigue and enabling floating, and medium hardness preventing bend under stroke force (unlike pure Al which is too soft, and steel which is too dense at 7.75 g/cm³)",
    ],
    criteria: {
      achieved: [
        "Identifies aluminium as a metal and defines an alloy as a mixture of metals/elements.",
        "Describes malleability in aluminium and states that adding magnesium makes it harder/less malleable.",
        "Uses data from Table 1 to identify that steel is denser and harder, and pure aluminium is softer.",
      ],
      merit: [
        "Explains that aluminium consists of regular layers of aluminium cations surrounded by delocalised electrons; layers can slide past each other without breaking metallic bonds, making it malleable enough to extrude into hollow tubes.",
        "Explains that magnesium atoms are a different size from aluminium atoms; adding magnesium disrupts the regular arrangement of cations in the 3D network, preventing layers from sliding easily, decreasing malleability and increasing hardness.",
        "Explains that Al-Mg alloy combines low density (2.6-2.7 g/cm³) with sufficient hardness for paddling.",
      ],
      excellence: [
        "Comprehensively evaluates why the Al-Mg alloy is chosen over BOTH alternatives by linking particle properties directly to user requirements:",
        "Explains why pure aluminium fails: its low hardness means the paddle shaft would bend or buckle under the force of pulling through water.",
        "Explains why steel fails: although hard, its high density (7.75 g/cm³ - nearly triple that of the alloy) makes the paddle excessively heavy, causing rapid kayaker fatigue, and its high mass would cause the paddle to sink immediately if dropped into water.",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Aluminium is a metallic solid consisting of a regular 3D network of positive aluminium cations surrounded by a sea of delocalised valence electrons. Because the cations are arranged in uniform, regular layers and the electrostatic attraction (metallic bond) between the cations and the electron sea is non-directional, applying force allows the layers of cations to slide over each other without breaking the metallic bonds. This malleability allows manufacturers to extrude and roll solid aluminium into a long, uniform hollow tube for the paddle shaft.\n\n(b) An alloy is a substance composed of a base metal mixed with one or more other elements (metallic or non-metallic). In pure aluminium, all atoms/cations are identical in size, allowing layers to slip easily. When magnesium atoms are added to form an alloy, their different atomic radius distorts and disrupts the uniform rows of aluminium cations in the metallic 3D network. As a result, the layers can no longer slide smoothly over one another when stress is applied. This reduces malleability and substantially increases the hardness and structural rigidity of the material.\n\n(c) Based on Table 1, an aluminium and magnesium alloy is the optimal choice for a kayak paddle shaft because it balances density and hardness:\n1. Why pure aluminium is unsuitable: While pure aluminium has an appropriately low density (2.7 g/cm³), its relative hardness is 'Low'. Under the intense repetitive bending forces generated when a kayaker pulls the paddle blades vigorously through water, the un-alloyed shaft would easily flex, bend permanently, or buckle.\n2. Why steel is unsuitable: Although steel possesses 'High' hardness that resists bending, its density is 7.75 g/cm³ (almost triple that of the aluminium-magnesium alloy). A steel paddle would be excessively heavy, causing severe physical fatigue to the kayaker over long distances. Furthermore, this high density means that if the paddle is dropped into the water, its total weight will exceed the buoyant force of the hollow tube, causing it to sink to the sea floor.\n3. Why Al-Mg alloy is preferred: The Al-Mg alloy possesses a low density (2.60–2.7 g/cm³) and 'Medium' hardness. It is light enough for hours of effortless paddling, light enough to maintain buoyancy and float if dropped, and rigid enough to transmit maximum paddling power without bending.",
  },
  {
    id: "2025-q3-seawater-salt-floating-bottle",
    year: "2025",
    questionNumber: 3,
    title: "Question Three: Sea Water, Salt (NaCl) & Floating Bottle Buoyancy",
    contextSummary:
      "Sea water is made up of water, H2O, and dissolved salt, NaCl. White solid salt is visibly left behind on the surface of a sea kayak as water evaporates. The dried salt is brittle and crumbles when touched, but can be easily rinsed away with fresh water. Additionally, a plastic bottle containing air and fresh water floats on sea water.",
    materials: ["Water (H2O)", "Sodium Chloride (Salt, NaCl)", "Plastic Bottle (Polymer)", "Air"],
    materialTypes: ["Molecular Substance", "Ionic Material", "Synthetic Polymer", "Gaseous Mixture"],
    dataTables: [
      {
        title: "Table 2: Density and arrangement of particles of materials",
        headers: ["Property", "Sea water", "Fresh water", "Plastic bottle", "Air"],
        rows: [
          ["Density", "1.02–1.03 g/cm³", "~1 g/cm³", "0.94–0.965 g/cm³", "0.0012 g/cm³"],
          [
            "Arrangement of particles",
            "Mixture containing sodium chloride and water",
            "Pure substance (water molecules)",
            "Pure substance (long chain molecules)",
            "Mixture (gaseous molecules and atoms)",
          ],
        ],
      },
    ],
    subQuestions: [
      {
        label: "(a) Classification",
        prompt: "Identify the type of material water, H2O, is, and the type of material salt, NaCl, is.",
      },
      {
        label: "(b) Brittleness of Solid Salt",
        prompt:
          "Explain how the arrangement of particles in salt, NaCl, and the attractive forces between these particles leads to its brittleness.",
        helperHint: "Mention shifting of rows bringing like charges together, resulting in electrostatic repulsion that shatters the 3D network.",
      },
      {
        label: "(c) Dissolution in Water",
        prompt:
          "Explain how the properties and attractive forces of water and salt allow for water to visibly remove the salt from the surface of the sea kayak.",
        helperHint: "Mention polar water dipoles attracting Na+ and Cl- ions, overcoming the ionic 3D network bonds.",
      },
      {
        label: "(d) Floating Bottle Buoyancy",
        prompt:
          "Using the information in Table 2 and your knowledge of properties of materials, explain why the plastic bottle containing both air and fresh water floats on sea water.",
        helperHint: "Compare overall average density of the bottle + fresh water + air composite with the higher density of sea water (1.02-1.03 g/cm³).",
      },
    ],
    fullPrompt:
      "(a) Identify the types of materials water and salt are.\n\n(b) Explain how the arrangement of particles and attractive forces in solid NaCl lead to its brittleness.\n\n(c) Explain how the properties and attractive forces of water and salt allow water to dissolve and wash away the salt.\n\n(d) Using Table 2, explain why the plastic bottle containing both air and fresh water floats on sea water.",
    scaffoldingChecklist: [
      "Classified water as covalent molecular and NaCl as ionic",
      "Explained brittleness: force shifts 3D network planes, aligning like charges (+ next to +, - next to -), causing repulsive forces that shatter crystal",
      "Explained dissolution: polar water molecules surround surface ions; partially negative O attracts Na+, partially positive H attracts Cl-, overcoming ionic 3D network bonds",
      "Calculated / linked composite density: plastic (0.94-0.965 g/cm³) and air (0.0012 g/cm³) bring the total average density below seawater (1.02-1.03 g/cm³), creating a buoyant upward force",
    ],
    criteria: {
      achieved: [
        "Classifies water as molecular and NaCl as ionic.",
        "Describes salt as brittle and soluble in water.",
        "States that the bottle floats because it is less dense than sea water using data from Table 2.",
      ],
      merit: [
        "Explains that in solid NaCl, alternating positive and negative ions are held by ionic bonds; when force is applied, layers shift so ions of the same charge align and repel each other, shattering the crystal (brittleness).",
        "Explains that water is a polar molecule; the attractive forces between polar water molecules and the ions (Na+ and Cl-) overcome the ionic 3D network forces, dissolving the salt.",
        "Explains that the combination of low-density air (0.0012 g/cm³) and plastic (0.94-0.965 g/cm³) results in an overall average density less than sea water (1.02-1.03 g/cm³).",
      ],
      excellence: [
        "Comprehensively links particle properties to practical behaviour: details the specific electrostatic hydration mechanism (δ- oxygen attracting Na+, δ+ hydrogen attracting Cl-) that allows fresh water to completely cleanse the kayak surface.",
        "Evaluates the floating bottle buoyancy with particle packing: dissolved salt ions fit between water molecules, increasing mass without increasing volume proportionally, making sea water denser (1.02-1.03 g/cm³). Because the average density of the bottle system is lower than the surrounding sea water, the upward buoyant force exceeds the total weight of the bottle system, causing it to float.",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Water (H2O) is a covalent molecular substance, and salt (NaCl) is an ionic solid.\n\n(b) Solid sodium chloride is arranged in a rigid 3D crystal network of alternating positive sodium ions (Na+) and negative chloride ions (Cl-) held together by strong, multi-directional ionic bonds. When a mechanical force or tap is applied to the crystal, a layer of ions shifts slightly along the cleavage plane. This displacement brings ions of the same electrical charge into direct alignment with one another (positive next to positive, negative next to negative). The intense electrostatic repulsion between like charges immediately fractures the 3D network, causing the solid salt to crumble and shatter (brittleness).\n\n(c) Water molecules consist of oxygen covalently bonded to two hydrogen atoms. Because oxygen is more electronegative than hydrogen, water is a polar molecule with a partial negative charge on the oxygen atom (δ-) and partial positive charges on the hydrogen atoms (δ+). When water is applied to the sea kayak, the polar water dipoles surround the ions at the surface of the salt crystal: the partially negative oxygen ends attract the positive Na+ ions, and the partially positive hydrogen ends attract the negative Cl- ions. The cumulative attractive forces between water molecules and ions (hydration forces) are strong enough to overcome the ionic bonds holding the 3D network together. The ions dissociate and dissolve into the water as mobile hydrated ions (Na+(aq) and Cl-(aq)), allowing the salt residue to be effortlessly washed away.\n\n(d) According to Table 2, an object floats in a liquid if its overall average density is less than the density of the liquid it displaces. Sea water is a mixture of water and dissolved sodium chloride; the dissolved ions pack tightly between the water molecules, adding extra mass per unit volume and giving sea water a high density of 1.02–1.03 g/cm³. The plastic bottle has a density of 0.94–0.965 g/cm³, fresh water has a density of ~1.0 g/cm³, and air has an extremely low density of 0.0012 g/cm³. Because the bottle contains a substantial volume of air, the total combined mass divided by the total volume produces an average density significantly lower than 1.02 g/cm³. As a result, the upward buoyant force exerted by the displaced sea water exceeds the downward gravitational weight of the bottle system, causing it to float on the sea water.",
  },

  // ==========================================
  // 2024 EXAM QUESTIONS
  // ==========================================
  {
    id: "2024-q1-paper-circuits-graphite",
    year: "2024",
    questionNumber: 1,
    title: "Question One: Paper Electrical Circuits – Graphite (Carbon)",
    contextSummary:
      "A pencil containing graphite (carbon), C, has been used to draw an electrical circuit outlining a car on paper. A 9V battery and light-emitting diode (LED) are connected to the drawing, creating an operating electrical circuit.",
    materials: ["Graphite (Carbon)"],
    materialTypes: ["Covalent Network"],
    dataTables: [
      {
        title: "Table 1: Physical properties of graphite (carbon), C",
        headers: ["Physical property", "Numerical values", "Comment"],
        rows: [
          ["Melting point", "3650°C", "Very high"],
          ["Solubility in water", "—", "Insoluble"],
          ["Electrical conductivity", "3 × 10⁵ σ (S/m) at 20°C", "Good"],
          ["Malleability", "4.80 GPa", "Brittle"],
          ["Hardness", "1 to 2 Moh", "Soft"],
        ],
      },
    ],
    subQuestions: [
      {
        label: "(a) Describe 2 Properties & Link to Circuit Use",
        prompt:
          "Describe TWO physical properties of graphite (carbon) and link these two physical properties to their use in drawing and creating an operating electrical circuit.",
        helperHint: "Think about: soft/slippery (leaves a mark on paper when pressed) and good electrical conductivity (completes the circuit).",
      },
      {
        label: "(b) Explain Structure & Bonding",
        prompt:
          "Explain these TWO physical properties with reference to the structure and bonding of graphite (carbon).",
        helperHint: "Mention 2D hexagonal layers, delocalised valence electrons, strong covalent bonds within layers, weak forces between layers.",
      },
      {
        label: "(c) Evaluate Behaviour in Use",
        prompt:
          "Evaluate how graphite (carbon) will behave when used to draw and create an operating electrical circuit by linking the TWO physical properties to the structure and bonding.",
        helperHint: "Explain what happens when pencil slides on paper, and what happens when battery voltage is applied across the graphite track.",
      },
    ],
    fullPrompt:
      "(a) Describe TWO physical properties of graphite (carbon) from Table 1 and link them to drawing and creating an operating electrical circuit.\n\n(b) Explain these TWO physical properties with reference to the structure and bonding of graphite.\n\n(c) Evaluate how graphite will behave when used to draw and create an operating circuit by linking the two physical properties to structure and bonding.",
    scaffoldingChecklist: [
      "Identified electrical conductivity and softness/low hardness from Table 1",
      "Explained structure: 2D planar sheets of carbon atoms bonded covalently to 3 others, leaving 1 delocalised electron per atom",
      "Linked delocalised electrons to conducting current to illuminate the LED",
      "Linked weak interlayer forces to layers sliding off and transferring onto paper fibers when drawn",
    ],
    criteria: {
      achieved: [
        "Describes two physical properties from Table 1 (e.g. good electrical conductivity and soft/low hardness).",
        "Links properties to use (softness allows drawing lines; conductivity allows electric current to flow to light LED).",
        "Mentions covalent bonds or delocalised electrons.",
      ],
      merit: [
        "Explains that graphite consists of carbon atoms arranged in 2D hexagonal planar layers; each carbon forms 3 covalent bonds, leaving 1 delocalised electron free to move and carry charge, explaining electrical conductivity.",
        "Explains that the 2D layers are held together by weak attractive forces; applying shear friction when writing allows layers to easily slide off and transfer onto the paper surface, explaining softness.",
      ],
      excellence: [
        "Comprehensively evaluates the behaviour of graphite during both stages of the application:",
        "Drawing phase: mechanical friction overcomes weak interlayer forces, causing microscopic sheets of graphite to cleave and deposit as a continuous conductive track on paper fibers.",
        "Operating phase: the continuous conductive track allows mobile delocalised electrons to drift under the 9V battery's potential difference, completing the circuit to power the LED without overheating, thanks to graphite's very high melting point (3650°C).",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Two key physical properties of graphite from Table 1 are its good electrical conductivity (3 × 10⁵ S/m) and its softness / low hardness (1 to 2 Mohs). Its softness allows the graphite pencil tip to leave a visible, continuous deposit of carbon on paper when pressed and dragged across the surface. Its electrical conductivity allows an electric current from the 9V battery to flow through the drawn carbon line to power the light-emitting diode (LED).\n\n(b) Graphite is a covalent network solid composed of carbon atoms arranged in 2D planar hexagonal sheets. Within each sheet, each carbon atom forms strong covalent bonds with three adjacent carbon atoms, leaving one valence electron per carbon atom unbonded and delocalised across the layer. Because these delocalised electrons are mobile, they can flow freely parallel to the sheets when an electrical potential is applied, giving graphite its good electrical conductivity.\nFurthermore, while the covalent bonds within each layer are strong, the adjacent 2D layers are held together only by weak intermolecular forces. These weak attractive forces require minimal energy to overcome, allowing the layers to slide over one another easily and flake off under light friction, which gives graphite its softness and low hardness.\n\n(c) When a person draws an outline of a car with a graphite pencil, the frictional shear force against the fibrous cellulose of the paper easily overcomes the weak attractive forces between graphite layers. As a result, microscopic sheets of graphite flake off and adhere smoothly to the paper surface, establishing a continuous, unbroken path of carbon. When the 9V battery and LED are attached to this drawn outline, the continuous graphite line acts as a wire: the mobile delocalised electrons flow along the deposited sheets from the negative terminal to the positive terminal, delivering electrical energy to illuminate the LED. Moreover, because graphite has an exceptionally high melting point (3650°C) due to its strong covalent network within the sheets, the modest heat generated by electrical resistance in the circuit will not melt or break the drawn track, ensuring a reliable, operating paper circuit.",
  },
  {
    id: "2024-q2-co2-electrical-fire-extinguisher",
    year: "2024",
    questionNumber: 2,
    title: "Question Two: Electrical Fire – Carbon Dioxide (CO2) Extinguishers",
    contextSummary:
      "Carbon dioxide fire extinguishers are filled with non-flammable CO2 gas and can be used safely to put out electrical fires. Table 2 compares physical properties of CO2 and ambient air.",
    materials: ["Carbon Dioxide (CO2)", "Air (Mixture)"],
    materialTypes: ["Covalent Molecular Substance", "Gaseous Mixture"],
    dataTables: [
      {
        title: "Table 2: Physical properties of carbon dioxide and air",
        headers: ["Physical property", "CO2", "Air"],
        rows: [
          ["Density at 20°C (kg/m³)", "1.98 kg/m³", "1.20 kg/m³"],
          ["Electrical conductivity", "Insulator", "Insulator"],
        ],
      },
    ],
    subQuestions: [
      {
        label: "(a) Describe 2 Properties & Safe Fire Extinguishing",
        prompt:
          "Describe TWO physical properties of carbon dioxide from Table 2 and link these two physical properties to the safe use of carbon dioxide to prevent oxygen in the air from fuelling a fire.",
        helperHint: "Mention high density compared to air (smothers the fire by displacing oxygen) and electrical insulator (safe on electrical fires without shocking user).",
      },
      {
        label: "(b) Explain Structure & Bonding",
        prompt:
          "Explain these TWO physical properties, with reference to the structure and bonding of carbon dioxide.",
        helperHint: "Mention discrete linear CO2 molecules, molecular mass vs air, and lack of mobile charged particles.",
      },
      {
        label: "(c) Evaluate Fire Extinguisher Behaviour",
        prompt:
          "Evaluate how carbon dioxide will behave when used as a fire extinguisher by linking the TWO physical properties to structure and bonding.",
        helperHint: "Detail why it sinks over the flames to blanket oxygen, and why water extinguishers are dangerous on electrical fires while CO2 is safe.",
      },
    ],
    fullPrompt:
      "(a) Describe TWO physical properties of CO2 from Table 2 and link them to the safe extinguishing of electrical fires.\n\n(b) Explain these TWO physical properties with reference to the structure and bonding of CO2.\n\n(c) Evaluate how CO2 will behave when used as a fire extinguisher by linking both physical properties to structure and bonding.",
    scaffoldingChecklist: [
      "Identified density (1.98 kg/m³ vs 1.20 kg/m³) and electrical insulator from Table 2",
      "Explained structure: discrete covalent molecules held by weak intermolecular forces",
      "Explained electrical insulator: neutral molecules with all valence electrons localized in bonds, no free ions or delocalised electrons",
      "Evaluated extinguisher action: dense CO2 gas sinks and blankets the fire, displacing oxygen without conducting electricity back to the firefighter",
    ],
    criteria: {
      achieved: [
        "Describes two physical properties of CO2 from Table 2 (higher density than air and electrical insulator).",
        "Links properties to use (denser gas sinks to smother fire; insulator prevents electric shock).",
        "Identifies CO2 as a covalent molecular substance.",
      ],
      merit: [
        "Explains that CO2 is a covalent molecular gas; each discrete molecule has a molecular mass (44 g/mol) greater than the average mass of air molecules (~29 g/mol, N2 and O2), resulting in a higher gas density at 20°C (1.98 vs 1.20 kg/m³).",
        "Explains that all electrons in CO2 molecules are localized in covalent bonds or lone pairs; there are no free ions or delocalised electrons to move and carry charge, making it an electrical insulator.",
      ],
      excellence: [
        "Comprehensively evaluates how these physical properties operate during an electrical fire emergency:",
        "Evaluates the smothering mechanism: because CO2 has a significantly higher density than air (1.98 vs 1.20 kg/m³), the discharged gas sinks downwards, blanketing the burning equipment and displacing ambient oxygen (O2) required for combustion, extinguishing the fire.",
        "Evaluates electrical safety: unlike water (which contains dissolved ions and conducts electricity, causing electrocution), CO2 gas has zero mobile charged particles, allowing firefighters to discharge it directly onto live high-voltage components without electric current conducting back to the operator.",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Two key physical properties of carbon dioxide from Table 2 are its higher density than air (1.98 kg/m³ compared to 1.20 kg/m³ for air at 20°C) and its behaviour as an electrical insulator. The higher density allows discharged CO2 gas to sink and blanket the fire, displacing ambient oxygen (O2) to smother combustion. The electrical insulation property ensures that if sprayed onto live electrical circuits, electric current will not conduct through the gas stream to electrocute the person holding the extinguisher.\n\n(b) Carbon dioxide (CO2) is a covalent molecular substance composed of discrete linear molecules. Each carbon atom forms strong double covalent bonds with two oxygen atoms (O=C=O), but separate molecules are held together only by weak intermolecular forces. Because of these weak forces, CO2 exists as a gas at room temperature. Carbon dioxide has a molar mass of 44 g/mol, which is substantially heavier than the predominant gases in air (N2 at 28 g/mol and O2 at 32 g/mol, average ~29 g/mol). Consequently, at identical temperature and pressure, CO2 gas has a greater mass per unit volume, producing a density of 1.98 kg/m³ compared to air's 1.20 kg/m³.\nFurthermore, within CO2 molecules, all valence electrons are tightly held and localized in stable double covalent bonds and oxygen lone pairs. Because the molecules are electrically neutral and there are no mobile delocalised electrons or free ions to carry an electrical charge, carbon dioxide is an electrical insulator.\n\n(c) When deployed on an electrical fire, carbon dioxide behaves as an ideal extinguishing agent due to these linked properties. Because CO2 gas is significantly denser than ambient air, it immediately sinks over the burning electrical components, forming a heavy, invisible gaseous barrier directly above the fuel. This blanket starves the combustion zone of oxygen, cutting off the chemical reaction and extinguishing the flames without leaving messy residue that would ruin sensitive electronics.\nCritically, because CO2 is an electrical insulator with no mobile charged particles, spraying it directly onto energized electrical wiring poses zero danger of conductive flashback. In contrast, using a water-based extinguisher would conduct lethal high-voltage electrical current through the stream into the operator's hands. Thus, the combination of high density and electrical insulation makes CO2 uniquely suited for electrical fire safety.",
  },
  {
    id: "2024-q3-harakeke-muka-fishing-nets",
    year: "2024",
    questionNumber: 3,
    title: "Question Three: Harakeke (Muka) – Natural Polymer Fishing Nets",
    contextSummary:
      "Harakeke (New Zealand flax) leaves produce long white fibres called muka when scraped. Muka is a natural polymer that can be spun, plaited, and knotted to create kupenga (traditional Māori fishing nets), which are weighed down with stones to sink in water.",
    materials: ["Muka (Natural Polymer)", "Hemp", "Wool", "Glass"],
    materialTypes: ["Natural Polymer", "Natural Polymer", "Natural Polymer", "Inorganic Amorphous Solid"],
    dataTables: [
      {
        title: "Table 3: Young's modulus and solubility of various materials",
        headers: ["Material", "Young's modulus (GPa)", "Solubility in water"],
        rows: [
          ["Muka", "8.6 GPa", "Insoluble"],
          ["Hemp", "11.8 GPa", "Insoluble"],
          ["Wool", "2.3 GPa", "Insoluble"],
          ["Glass", "70–100 GPa", "Insoluble"],
        ],
        notes: "Note: A high value of Young's modulus means that a material is brittle. Kupenga are weighed down with stones to sink.",
      },
    ],
    subQuestions: [
      {
        label: "(a) Describe 2 Properties & Kupenga Use",
        prompt:
          "Describe TWO physical properties of muka from Table 3 and link these two physical properties to their use in making a working kupenga (fishing net).",
        helperHint: "Mention insolubility in water (does not dissolve when submerged) and low/moderate Young's modulus (flexible, not brittle).",
      },
      {
        label: "(b) Explain Structure & Bonding",
        prompt:
          "Explain these TWO physical properties, with reference to the structure and bonding of muka.",
        helperHint: "Mention long cellulose polymer chains, strong covalent backbone, intermolecular forces, and non-polar characteristics.",
      },
      {
        label: "(c) Evaluate Kupenga Behaviour in Use",
        prompt:
          "Evaluate how muka will behave when used as a kupenga by linking the TWO physical properties to the structure and bonding.",
        helperHint: "Explain why it withstands marine immersion, holds heavy fish loads without snapping, and bends to be pulled onto waka.",
      },
    ],
    fullPrompt:
      "(a) Describe TWO physical properties of muka from Table 3 and link them to making a working kupenga (fishing net).\n\n(b) Explain these TWO physical properties with reference to the structure and bonding of muka.\n\n(c) Evaluate how muka will behave when used as a kupenga by linking the two physical properties to structure and bonding.",
    scaffoldingChecklist: [
      "Identified insolubility in water and moderate Young's modulus (flexibility/non-brittle) from Table 3",
      "Explained muka as a natural polymer (long chains of cellulose monomers linked by covalent bonds)",
      "Explained insolubility: strong internal covalent chains and cross-linking prevent water from breaking chains apart",
      "Evaluated kupenga in use: withstands water exposure without degrading, knots tightly without snapping, and pulls heavy fish loads",
    ],
    criteria: {
      achieved: [
        "Describes two physical properties of muka from Table 3 (insoluble in water and flexible / low Young's modulus of 8.6 GPa).",
        "Links properties to use (does not dissolve in water; can be knotted and folded without snapping).",
        "Identifies muka as a natural polymer.",
      ],
      merit: [
        "Explains that muka is a natural polymer made of long, repeating molecular chains held internally by strong covalent bonds, with intermolecular forces between chains; water cannot overcome these strong bonds, making muka insoluble.",
        "Explains that muka's moderate Young's modulus (8.6 GPa) means it is flexible rather than brittle; polymer chains can flex and slide slightly under stress, allowing fibres to be knotted without fracturing.",
      ],
      excellence: [
        "Comprehensively evaluates how the structure and bonding of muka dictate its performance as a kupenga in practical marine conditions:",
        "Immersion durability: because water molecules cannot break the extensive covalent backbone of the polymer, the net retains its structural integrity and tensile strength even after prolonged soaking in salt water.",
        "Mechanical performance: evaluates muka's low brittleness compared to high-modulus materials like glass (70-100 GPa); when loaded with stones and struggling fish, the knotted polymer fibres distribute stress along continuous covalent chains, flexing under turbulent waves without snapping and hauling heavy catches safely.",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Two physical properties of muka from Table 3 are its insolubility in water and its moderate Young's modulus (8.6 GPa, indicating that it is flexible and not brittle). Being insoluble in water ensures that the kupenga (fishing net) will not dissolve, soften, or disintegrate when cast into lakes or the sea. The low/moderate Young's modulus ensures that the muka fibres are flexible enough to be spun, plaited, and knotted into mesh without breaking, and can fold easily when retrieved onto a waka.\n\n(b) Muka is a natural polymer composed of long macromolecular chains of cellulose linked by strong covalent bonds. These long chains align parallel to one another in microfibrils and are bound by extensive networks of intermolecular hydrogen bonds. Because the covalent bonds along the polymer backbone are exceptionally strong and require enormous energy to break, ambient water molecules cannot separate or break down the long polymer chains, making muka completely insoluble in water.\nFurthermore, Table 3 notes that a high value of Young's modulus indicates brittleness (such as glass at 70–100 GPa). Muka has a low-to-moderate Young's modulus of only 8.6 GPa. In polymers, the combination of long covalent chains and intermolecular attractions allows the chains to flex, slide slightly, and bend under tensile and torsional stress without rupturing the primary covalent backbone. This makes muka tough and flexible rather than brittle.\n\n(c) When deployed as a working kupenga, muka performs exceptionally well due to these structural characteristics. When submerged in the ocean with stone sinkers attached, the water immersion has no detrimental effect on the net's structural integrity because the polymer chains cannot be broken by water. As waves pull against the net and large schools of struggling fish are trapped inside, the knots experience immense multi-directional tensile forces. If a brittle material like glass (70-100 GPa) or an excessively stiff fibre were used, the concentrated stress at the knots would cause sudden shattering and net failure. Because muka's polymer chains can flex and distribute mechanical load evenly along the continuous covalent chains, the net stretches slightly to absorb shock loads from surging surf and heavy catches without tearing. This enables the kupenga to be used repeatedly in water without loss of strength.",
  },

  // ==========================================
  // 2023 PILOT ASSESSMENT
  // ==========================================
  {
    id: "2023-pilot-elements-smartphone",
    year: "2023",
    questionNumber: 1,
    title: "Question One: Elements in a Smartphone (Cu, Au, Sn) & Heat Sinks",
    contextSummary:
      "A smartphone contains intricate internal circuitry with copper (Cu), gold (Au), and tin (Sn). The phone includes electrical components, a heat sink to draw heat away, and solder (mainly tin) to join components together by melting then cooling.",
    materials: ["Copper (Cu)", "Gold (Au)", "Tin (Sn)"],
    materialTypes: ["Metallic Solid", "Metallic Solid", "Metallic Solid"],
    dataTables: [
      {
        title: "Table A: Properties of chemicals",
        headers: ["Substance", "Melting point (°C)", "Electrical conductivity, σ (1/Ω·m)", "Thermal conductivity, k (W/m·K)"],
        rows: [
          ["Copper", "1084°C", "5.96 × 10⁷", "413"],
          ["Gold", "1063°C", "4.52 × 10⁷", "319"],
        ],
      },
      {
        title: "Table B: Solder properties",
        headers: ["Substance", "Melting point (°C)", "Electrical conductivity, σ (1/Ω·m)"],
        rows: [
          ["Copper", "1084°C", "5.96 × 10⁷"],
          ["Gold", "1063°C", "4.52 × 10⁷"],
          ["Tin", "232°C", "9.17 × 10⁶"],
        ],
      },
    ],
    subQuestions: [
      {
        label: "(a) Structure & Physical Properties of Cu, Au, Sn",
        prompt:
          "Identify the ONE type of chemical structure that copper, gold, and tin all share. Identify TWO key physical properties needed for these elements to be used for electrical components, and link their structure to their use.",
      },
      {
        label: "(b) Heat Sink Selection (Copper vs Gold)",
        prompt:
          "Using Table A, discuss which of the two elements (copper or gold) would be the most suitable as a heat sink to prevent a smartphone from overheating.",
      },
      {
        label: "(c) Why Solder is Mainly Tin",
        prompt:
          "Solder is used to join electrical components by melting then cooling, forming a solid join. Use Table B to discuss why solder is mainly made of tin.",
      },
    ],
    fullPrompt:
      "(a) Identify the chemical structure copper, gold, and tin share. Identify TWO physical properties needed for electrical components, and link structure to their use.\n\n(b) Using Table A, discuss whether copper or gold is most suitable as a heat sink to prevent smartphone overheating.\n\n(c) Using Table B, discuss why solder used to join electrical components is mainly made of tin.",
    scaffoldingChecklist: [
      "Identified metallic structure for Cu, Au, Sn",
      "Identified electrical conductivity and malleability/ductility",
      "Explained heat sink: copper has higher thermal conductivity (413 vs 319 W/mK) and higher melting point, drawing heat away faster",
      "Explained solder: tin has a much lower melting point (232°C vs >1000°C) allowing melting without damaging delicate microchips",
    ],
    criteria: {
      achieved: [
        "Identifies structure as metallic.",
        "Identifies electrical conductivity and heat conduction or malleability as key properties.",
        "Identifies copper as best for heat sink and tin as best for solder based on tables.",
      ],
      merit: [
        "Explains that Cu, Au, and Sn are metallic solids with delocalised valence electrons that move to carry electric current, and layers of cations that can slide making them malleable.",
        "Explains from Table A that copper has a higher thermal conductivity (413 W/m·K vs 319 W/m·K), meaning it conducts heat away from internal components more rapidly than gold.",
        "Explains from Table B that tin has a much lower melting point (232°C) than copper (1084°C) or gold (1063°C), allowing it to melt at safe soldering temperatures while still conducting electricity.",
      ],
      excellence: [
        "Comprehensively evaluates all three applications in context:",
        "Evaluates heat sink: copper's higher thermal conductivity (413 W/mK) dissipates concentrated heat away from processor chips faster to prevent thermal throttling, while its high melting point (1084°C) prevents deformation under operating temperatures.",
        "Evaluates solder: tin's low melting point of 232°C allows low-temperature soldering irons to liquefy the metal without scorching adjacent silicon chips or plastic casings (which would be destroyed if copper's 1084°C melting temperature were required); upon cooling, the regular metallic 3D network reforms solid joins with good electrical conductivity (9.17 × 10⁶ S/m).",
      ],
    },
    sampleExcellenceAnswer:
      "(a) Copper (Cu), gold (Au), and tin (Sn) all share a metallic solid structure. Two key physical properties needed for electrical components are electrical conductivity and malleability (or ductility). In metallic solids, metal cations are surrounded by a sea of delocalised valence electrons. These delocalised electrons are mobile and move through the 3D network when a voltage is applied, conducting electrical charge between smartphone components. Furthermore, because the cations are arranged in regular layers and metallic bonds are non-directional, the layers can slide past each other without breaking, allowing these metals to be drawn into ultra-thin wires and stamped into delicate circuit tracks without fracturing.\n\n(b) According to Table A, copper is the most suitable element for a heat sink. A heat sink must draw thermal energy away from the hot processor components to the exterior casing as quickly as possible. Copper has a significantly higher thermal (heat) conductivity (k = 413 W/m·K) than gold (k = 319 W/m·K). In copper, mobile delocalised electrons rapidly absorb kinetic energy from hot components and transfer it through collisions across the metal 3D network faster than in gold. Additionally, copper has a higher melting point (1084°C vs 1063°C), ensuring it remains completely rigid under elevated thermal stress.\n\n(c) Solder is primarily made of tin because of its low melting point combined with its ability to conduct electricity. Table B shows that tin has a melting point of only 232°C, whereas copper melts at 1084°C and gold melts at 1063°C. In smartphone manufacturing, components are joined using a soldering tool. Because delicate silicon microchips and plastic circuit boards would be incinerated at temperatures above 1000°C, using copper or gold as solder is impossible. Tin melts easily at 232°C, flowing between components as a liquid, and then solidifies upon cooling to form a strong metallic bond. Once solidified, tin's delocalised electrons ensure reliable electrical conductivity (9.17 × 10⁶ S/m) across the join.",
  },
  {
    id: "2023-pilot-battery-graphite-lithium",
    year: "2023",
    questionNumber: 2,
    title: "Question Two: Smartphone Battery – Graphite vs Diamond & Lithium Salt",
    contextSummary:
      "Inside a smartphone's lithium-ion battery, electrical current flows between terminals (+ and -), and ions carry charge between terminals through an electrolyte. Both graphite and diamond are allotropes of carbon. A salt is a metal ion joined to a non-metal ion.",
    materials: ["Graphite", "Diamond", "Lithium Salt Solution", "Solid Lithium Salt"],
    materialTypes: ["Covalent Network", "Covalent Network", "Aqueous Solution", "Ionic Material"],
    subQuestions: [
      {
        label: "(d) Graphite vs Diamond for Battery Terminals",
        prompt:
          "Discuss why graphite is used as part of a smartphone battery terminal to conduct electricity rather than diamond. In your answer refer to: type of chemicals graphite and diamond are, their structures, and their relevant physical properties.",
      },
      {
        label: "(e) Lithium Salt Solution vs Solid Lithium Salt",
        prompt:
          "Discuss why a lithium salt solution is a more suitable source of lithium ions than a solid lithium salt. Include the type of chemical lithium salt is and the physical property a solid salt must have to dissolve into a liquid.",
      },
    ],
    fullPrompt:
      "(d) Discuss why graphite is used as part of a smartphone battery terminal to conduct electricity rather than diamond, referring to chemical types, structures, and physical properties.\n\n(e) Discuss why a lithium salt solution is a more suitable source of lithium ions than a solid lithium salt, including chemical type and solubility.",
    scaffoldingChecklist: [
      "Classified both diamond and graphite as covalent networks (carbon allotropes)",
      "Contrasted graphite (2D sheets with delocalised electrons that conduct) with diamond (3D tetrahedral, all valence electrons locked in single bonds, electrical insulator)",
      "Classified lithium salt as an ionic material (lithium cations and anions)",
      "Contrasted mobile ions in dissolved solution vs fixed ions in rigid solid 3D crystal network",
    ],
    criteria: {
      achieved: [
        "Identifies graphite and diamond as covalent networks.",
        "States graphite conducts electricity and diamond does not.",
        "Identifies lithium salt as an ionic material and mentions solubility.",
      ],
      merit: [
        "Explains that in graphite each carbon forms 3 covalent bonds in 2D layers, leaving 1 delocalised electron per atom free to move along layers and conduct electricity, whereas diamond forms 4 covalent bonds in a 3D network with no mobile electrons.",
        "Explains that solid lithium salt has ions locked in fixed positions in a 3D crystal network and cannot conduct, whereas dissolving in a liquid overcomes 3D network forces, freeing lithium ions to move between battery terminals.",
      ],
      excellence: [
        "Comprehensively evaluates terminal and electrolyte operational roles inside a working smartphone battery:",
        "Graphite terminal evaluation: mobile delocalised electrons allow seamless electron conduction into external circuits, while layers provide interstitial spaces for lithium intercalation without structural degradation; diamond's rigid 3D tetrahedral network completely insulates electricity, making it impossible to function as a battery terminal.",
        "Lithium electrolyte evaluation: a battery requires continuous ionic transport between electrodes during charging/discharging; in solid salt, ions are immobilized by strong electrostatic 3D network attractions, preventing ion migration; in solution, dissolved lithium ions move freely to sustain electrochemical redox reactions.",
      ],
    },
    sampleExcellenceAnswer:
      "(d) Both graphite and diamond are allotropes of carbon that belong to the covalent network class of materials, but their contrasting structures dictate their ability to conduct electricity.\nIn graphite, carbon atoms are arranged in 2D planar hexagonal layers. Each carbon atom forms strong covalent bonds with three neighbouring carbon atoms, leaving one valence electron per carbon atom delocalised across the layer. Because these delocalised valence electrons are mobile, they can flow freely parallel to the sheets when connected to a circuit, allowing graphite to act as an electrical terminal. Furthermore, the weak forces between layers allow the structure to accommodate lithium ions between layers (intercalation) without fracturing.\nIn contrast, diamond has a 3D tetrahedral network in which every carbon atom is covalently bonded to four other carbon atoms. All four valence electrons of each carbon are locked into strong, localized single covalent bonds. With no free ions or mobile delocalised electrons available to carry charge, diamond is an electrical insulator. Using diamond as a battery terminal would prevent any electrical current from entering or leaving the battery, completely halting phone operation.\n\n(e) A lithium salt is an ionic material composed of positive lithium cations (Li+) and negative anions held together by strong, multi-directional electrostatic attractions (ionic bonds) in a 3D crystalline network. In order for a solid salt to form a liquid solution, it must possess the physical property of solubility in the solvent.\nIn a solid lithium salt, the ions are held in fixed positions within the rigid 3D crystal network and can only vibrate; they cannot move from place to place. Because an operating smartphone battery requires rapid migration of lithium ions between the anode and cathode during charge and discharge cycles, an immobilized solid salt cannot transport charge. In contrast, when the lithium salt is dissolved into a liquid electrolyte, the polar solvent molecules overcome the ionic 3D network attractions, causing the salt to dissociate into individual mobile lithium ions. These free-floating ions can move swiftly across the battery cell between terminals, sustaining the electrochemical reaction and powering the smartphone.",
  },
  {
    id: "2023-pilot-aluminium-alloys-battery-cover",
    year: "2023",
    questionNumber: 3,
    title: "Question Three: Smartphone Battery Cover – Aluminium Alloys",
    contextSummary:
      "A smartphone manufacturer is selecting an aluminium alloy to fabricate the protective battery cover. Table C provides physical properties of two prospective aluminium alloys.",
    materials: ["Alloy 1", "Alloy 2"],
    materialTypes: ["Metallic Alloy", "Metallic Alloy"],
    dataTables: [
      {
        title: "Table C: Properties of aluminium alloys",
        headers: ["Substance", "Melting point (°C)", "Density (kg/m³)", "Malleability (GPa)"],
        rows: [
          ["Alloy 1", "635°C", "2810 kg/m³", "70 GPa"],
          ["Alloy 2", "649°C", "2640 kg/m³", "68 GPa"],
        ],
        notes: "Note: A more malleable metal/alloy has a lower GPa value.",
      },
    ],
    subQuestions: [
      {
        label: "(f) Alloy Definition & Battery Cover Comparison",
        prompt:
          "State what an alloy is. Compare the physical properties of Alloy 1 and Alloy 2 from Table C and link these to their suitability as a battery cover in a smartphone.",
      },
    ],
    fullPrompt:
      "(f) State what an alloy is, compare the physical properties of Alloy 1 and Alloy 2 from Table C, and discuss which alloy would be most appropriate as a battery cover for a smartphone.",
    scaffoldingChecklist: [
      "Defined alloy as a mixture of a base metal with other elements",
      "Analyzed Table C: Alloy 2 has lower density (2640 vs 2810 kg/m³), higher melting point (649 vs 635°C), and lower GPa (68 vs 70 GPa, meaning more malleable)",
      "Linked properties to battery cover: lighter phone, easily stamped into thin casing, resists battery heat",
      "Selected Alloy 2 with full justification across all three properties",
    ],
    criteria: {
      achieved: [
        "Defines an alloy as a mixture of a metal with other elements.",
        "Compares properties from Table C (Alloy 2 has lower density and higher melting point, Alloy 2 has lower GPa).",
        "Selects Alloy 2 as the preferred choice.",
      ],
      merit: [
        "Explains that an alloy is formed by mixing different-sized atoms into a metal 3D network to alter properties.",
        "Explains from Table C that Alloy 2 has a lower density (2640 kg/m³), making the phone lighter to hold, and a lower GPa value (68 GPa), meaning it is more malleable and can be pressed into the smartphone's thin battery cover without cracking.",
        "Notes that Alloy 2 also has a slightly higher melting point (649°C), ensuring thermal stability.",
      ],
      excellence: [
        "Comprehensively evaluates all three physical properties from Table C to justify why Alloy 2 is superior for the smartphone battery cover:",
        "Malleability evaluation: a battery cover must be stamped into a thin, precise profile with folded edges; Alloy 2's lower GPa (68 GPa) means it yields more readily under die stamping without micro-fracturing.",
        "Density & mass evaluation: Alloy 2's lower density (2640 kg/m³ vs 2810 kg/m³) reduces overall device weight and pocket inertia without sacrificing structural rigidity.",
        "Thermal safety evaluation: batteries generate heat during fast charging; Alloy 2's higher melting point (649°C) guarantees dimensional stability and prevents warping under elevated temperatures.",
      ],
    },
    sampleExcellenceAnswer:
      "An alloy is a metallic substance composed of a base metal (here, aluminium) mixed with one or more other elements (metallic or non-metallic) to enhance specific mechanical or physical properties.\n\nBased on the data in Table C, Alloy 2 is the most appropriate material for a smartphone battery cover. This is justified by analyzing all three physical properties:\n\n1. Malleability (Shaping the Cover): Table C notes that a more malleable alloy has a lower GPa value. Alloy 2 has a lower value of 68 GPa compared to Alloy 1's 70 GPa. A smartphone battery cover is an ultra-thin, intricate component with precise folded edges, screw tabs, and speaker cutouts. Because Alloy 2 is more malleable, it can be stamped, deep-drawn, and bent into complex, thin shell geometries during manufacturing without experiencing shear micro-cracking or tearing along the seams.\n\n2. Density (Device Weight): Alloy 2 has a lower density of 2640 kg/m³ compared to Alloy 1's 2810 kg/m³ (a reduction of 170 kg/m³). Smartphones are handheld mobile devices carried constantly in pockets. Utilizing Alloy 2 reduces the total weight of the phone, minimizing user wrist fatigue while preserving structural protection for the delicate lithium battery.\n\n3. Melting Point (Thermal Resistance): Modern smartphone batteries generate substantial heat during rapid charging and intensive processing. Alloy 2 has a higher melting point (649°C compared to Alloy 1's 635°C). While both are safely above normal operating temperatures, the higher thermal threshold of Alloy 2 indicates stronger overall metallic bonding, providing superior thermal resistance and ensuring the cover will not warp, soften, or lose its structural rigidity under elevated battery heat.\n\nTherefore, because Alloy 2 is lighter, more malleable for manufacturing, and more heat-tolerant, it is the superior choice for the battery cover.",
  },
];

export const PRACTICE_QUESTIONS = ALL_EXAM_QUESTIONS;
