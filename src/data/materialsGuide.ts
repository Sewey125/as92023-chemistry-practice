export interface MaterialClassGuide {
  id: string;
  name: string;
  nzqaExamples: string[];
  constituentParticles: string;
  bondingAndAttractiveForces: string;
  physicalProperties: {
    property: string;
    description: string;
    particleExplanation: string;
  }[];
  keyExaminerNotes: string[];
}

export const OFFICIAL_MATERIALS_GUIDE: MaterialClassGuide[] = [
  {
    id: "metallic",
    name: "Metallic Solids & Alloys",
    nzqaExamples: ["Lead pipe", "Magnesium alloy wheels", "Copper wire", "Steel"],
    constituentParticles: "Metal cations (positive ions) and delocalised valence electrons",
    bondingAndAttractiveForces: "Non-directional electrostatic attractions (metallic bonds) between cations and the sea of mobile valence electrons.",
    physicalProperties: [
      {
        property: "Electrical Conductivity",
        description: "Excellent conductors in both solid and molten states.",
        particleExplanation: "Mobile delocalised valence electrons are free to move throughout the metallic 3D network and carry an electrical charge.",
      },
      {
        property: "Thermal Conductivity",
        description: "Transfers heat very rapidly.",
        particleExplanation: "Delocalised electrons gain kinetic energy and move rapidly through the 3D network, colliding with cations and distributing heat energy.",
      },
      {
        property: "Malleability & Ductility",
        description: "Can be hammered into sheets or drawn into wires without shattering.",
        particleExplanation: "Cations are arranged in regular layers. When force is applied, layers slide over each other while non-directional delocalised electrons maintain the bond.",
      },
      {
        property: "Alloy Hardness",
        description: "Alloys are harder and less malleable than pure metals.",
        particleExplanation: "Different-sized solute atoms disrupt the regular cation 3D network, preventing layers of cations from sliding easily under stress.",
      },
    ],
    keyExaminerNotes: [
      "Avoid saying 'metals are strong' without mentioning the electrostatic attraction between cations and delocalised electrons.",
      "Explicitly mention 'layers of cations sliding' when explaining malleability or why alloys are harder.",
    ],
  },
  {
    id: "ionic",
    name: "Ionic Materials",
    nzqaExamples: ["Salt (Sodium chloride, NaCl)", "Nitrate fertilizers", "Magnesium oxide"],
    constituentParticles: "Cations (positive ions) and anions (negative ions)",
    bondingAndAttractiveForces: "Strong electrostatic attractions (ionic bonds) acting in 3 dimensions throughout the 3D crystalline network.",
    physicalProperties: [
      {
        property: "Melting & Boiling Points",
        description: "Very high melting and boiling points.",
        particleExplanation: "A large amount of thermal energy is required to overcome the strong, multi-directional ionic bonds throughout the 3D network.",
      },
      {
        property: "Electrical Conductivity",
        description: "Insulator in solid state, but conducts when molten or dissolved in water.",
        particleExplanation: "In solid state, ions are locked in fixed positions within the 3D network and cannot move. When molten or dissolved in water, ions dissociate and are free to move to carry charge.",
      },
      {
        property: "Solubility in Water",
        description: "Many dissolve readily in polar solvents like water.",
        particleExplanation: "Polar water molecules surround surface ions: partial negative oxygens attract cations and partial positive hydrogens attract anions, pulling ions into solution.",
      },
      {
        property: "Brittleness",
        description: "Shatters when struck with high shear force.",
        particleExplanation: "A shear force pushes like-charged ions into alignment with each other. The resulting repulsive forces shatter the 3D network.",
      },
    ],
    keyExaminerNotes: [
      "Never refer to particles in ionic solids as 'atoms' or 'molecules'. They are strictly cations and anions.",
      "Do NOT say 'electrons carry charge in salt water'. Electrical charge in aqueous solutions is carried exclusively by mobile ions.",
    ],
  },
  {
    id: "covalent-networks",
    name: "Covalent Network Solids",
    nzqaExamples: ["Diamond", "Graphite", "Silicon dioxide (Silica, SiO2)"],
    constituentParticles: "Non-metal atoms (Carbon atoms in diamond/graphite; Silicon & Oxygen atoms in silica)",
    bondingAndAttractiveForces: "Strong, directional covalent bonds (shared pairs of electrons) extending in continuous 2D or 3D networks.",
    physicalProperties: [
      {
        property: "Hardness (Diamond & Silica)",
        description: "Extremely hard, resistant to scratching and abrasion.",
        particleExplanation: "Continuous 3D tetrahedral network of strong covalent bonds. Deforming requires breaking many strong directional bonds simultaneously.",
      },
      {
        property: "Conductivity (Graphite)",
        description: "Good electrical conductor along its planar sheets.",
        particleExplanation: "Each carbon atom is bonded to 3 others, leaving 1 delocalised electron per atom that is free to move parallel to the 2D sheets.",
      },
      {
        property: "Lubrication (Graphite)",
        description: "Soft, slippery, flakes off easily under friction.",
        particleExplanation: "While covalent bonds within each 2D sheet are strong, separate sheets are held only by weak attractive forces that easily slide and shear off.",
      },
      {
        property: "Melting Points",
        description: "Extremely high melting / sublimation points (>3500°C).",
        particleExplanation: "Immense thermal energy is needed to disrupt the continuous network of strong covalent bonds.",
      },
    ],
    keyExaminerNotes: [
      "Distinguish clearly between diamond (3D network, 4 bonds per C, insulator) and graphite (2D network, 3 bonds per C, 1 delocalised electron, conductor).",
      "In graphite, covalent bonds DO NOT break when lubricating; only the weak intermolecular forces between layers break.",
    ],
  },
  {
    id: "polymers",
    name: "Natural & Synthetic Polymers",
    nzqaExamples: ["Low-Density Polyethylene (LDPE)", "PTFE non-stick coatings", "Silicone", "DNA", "Proteins"],
    constituentParticles: "Very long macromolecular chains composed of repeating monomer units (atoms bonded covalently into long chains)",
    bondingAndAttractiveForces: "Strong covalent bonds along the polymer backbone; weak intermolecular forces (or cross-links) between adjacent polymer chains.",
    physicalProperties: [
      {
        property: "Flexibility & Density (LDPE)",
        description: "Low density, flexible, bends repeatedly without cracking.",
        particleExplanation: "Frequent side-chain branching prevents polymer chains from packing closely. Weaker intermolecular forces allow chains to flex and slide past each other.",
      },
      {
        property: "Thermal & Electrical Insulation",
        description: "Poor conductors of heat and electricity.",
        particleExplanation: "All electrons are localized in covalent bonds; there are no mobile ions or delocalised electrons. Heat transfers only sluggishly along chains.",
      },
      {
        property: "Non-Stick Surface (PTFE)",
        description: "Extremely low surface friction and chemical inertness.",
        particleExplanation: "Electronegative fluorine atoms tightly shield the carbon backbone with strong C-F bonds, preventing other molecules from forming attractive forces.",
      },
    ],
    keyExaminerNotes: [
      "Do NOT say 'covalent bonds break' when LDPE or polymers melt or flex. Only the weak intermolecular forces between chains are overcome.",
      "Link branching explicitly to low density and flexible behaviour in LDPE.",
    ],
  },
  {
    id: "molecular",
    name: "Covalent Molecular Substances",
    nzqaExamples: ["Water (H2O)", "Iodine (I2)", "Carbon dioxide (CO2)"],
    constituentParticles: "Discrete molecules (atoms held internally by covalent bonds)",
    bondingAndAttractiveForces: "Strong intramolecular covalent bonds within molecules; weak intermolecular forces between separate molecules.",
    physicalProperties: [
      {
        property: "Melting & Boiling Points",
        description: "Low melting and boiling points (often liquids or gases at room temperature).",
        particleExplanation: "Overcoming weak intermolecular forces requires relatively little heat energy. The strong internal covalent bonds remain intact.",
      },
      {
        property: "Electrical Conductivity",
        description: "Non-conductors of electricity in all states.",
        particleExplanation: "Molecules are neutral with all valence electrons localized in bonds or lone pairs; no mobile charged particles exist.",
      },
      {
        property: "Solubility & Polarity",
        description: "Polar molecules dissolve in polar solvents (e.g., water); non-polar molecules dissolve in non-polar solvents.",
        particleExplanation: "Like dissolves like: attractive forces formed between solute and solvent must be comparable to the forces broken in the pure substances.",
      },
    ],
    keyExaminerNotes: [
      "Crucial NCEA distinction: Melting water or boiling iodine breaks WEAK INTERMOLECULAR FORCES, never covalent bonds.",
    ],
  },
];
