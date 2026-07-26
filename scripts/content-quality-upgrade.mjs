import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const meta = {
  "index.html": [
    "Commercial Office Furniture Manufacturer | HUANGSI",
    "HUANGSI manufactures office workstations, chairs, desks, reception furniture, storage and acoustic solutions for OEM, bulk export and commercial projects.",
  ],
  "catalog.html": [
    "Office Furniture Catalog & Product Range | HUANGSI",
    "Explore HUANGSI office workstations, desks, chairs, reception furniture, storage and acoustic products, then request the relevant digital catalog.",
  ],
  "oem-manufacturing.html": [
    "OEM Office Furniture Manufacturing & Customization | HUANGSI",
    "Plan custom office furniture dimensions, finishes, materials, accessories, labels and export packaging with HUANGSI for commercial and bulk projects.",
  ],
  "quality-control.html": [
    "Office Furniture Quality Control Process | HUANGSI",
    "Review HUANGSI office furniture quality checkpoints for materials, finishes, trial assembly, functions, hardware, packaging and pre-shipment verification.",
  ],
  "packaging-loading.html": [
    "Office Furniture Packaging & Container Loading | HUANGSI",
    "Learn how office furniture carton data, KD structures, CBM, pallet options and mixed-category container loading are reviewed for export orders.",
  ],
  "commercial-office-furniture-manufacturer.html": [
    "Commercial Office Furniture Manufacturer & OEM Supplier",
    "Source coordinated office workstations, desks, chairs, storage, reception and acoustic solutions for commercial projects, OEM programs and bulk export.",
  ],
  "office-chairs.html": [
    "Office Chair Manufacturer for Commercial Projects | HUANGSI",
    "Compare ergonomic mesh, task and executive office chair options for distributors, workplace projects, OEM programs and bulk export orders.",
  ],
  "office-desks.html": [
    "Office Desk Manufacturer for Commercial Projects | HUANGSI",
    "Explore staff desks, executive desks, height-adjustable desks and workstation systems for commercial office projects and bulk purchasing.",
  ],
  "office-storage.html": [
    "Office Storage Cabinet Manufacturer | HUANGSI",
    "Explore office storage cabinets, filing cabinets, lockers and bookcases for corporate offices, schools, clinics and commercial interiors.",
  ],
  "workstations.html": [
    "Office Workstation Manufacturer & Project Supplier | HUANGSI",
    "Compare modular benching and open-plan workstation systems with coordinated finishes, cable management and layouts for commercial office projects.",
  ],
  "reception-furniture.html": [
    "Reception Furniture Manufacturer & Project Supplier | HUANGSI",
    "Source reception desks, office sofas, waiting-area seating and lobby storage for offices, clinics, hotels and other commercial projects.",
  ],
  "acoustic-office-solutions.html": [
    "Acoustic Office Solutions & Office Pods | HUANGSI",
    "Explore acoustic wall panels, office pods and sound-absorbing solutions for meeting rooms, phone areas, focused work and open-plan offices.",
  ],
  "applications/co-working-space-furniture.html": [
    "Co-working Space Furniture Solutions | HUANGSI",
    "Plan flexible co-working spaces with modular workstations, shared desks, office pods, acoustic panels, storage and collaborative seating.",
  ],
  "applications/corporate-office-projects.html": [
    "Corporate Office Furniture Project Solutions | HUANGSI",
    "Coordinate workstations, private offices, meeting rooms, reception areas and storage for headquarters, branch offices and workplace rollouts.",
  ],
  "applications/meeting-room-furniture.html": [
    "Meeting Room Furniture Solutions | HUANGSI",
    "Plan meeting rooms with conference tables, ergonomic chairs, presentation storage and acoustic treatments for commercial office projects.",
  ],
  "applications/open-plan-office-furniture.html": [
    "Open-plan Office Furniture Solutions | HUANGSI",
    "Plan open offices with modular workstation clusters, cable management, partitions, storage and acoustic products for focused collaborative work.",
  ],
  "applications/reception-area-furniture.html": [
    "Reception Area Furniture Solutions | HUANGSI",
    "Create commercial lobbies with reception counters, office sofas, visitor seating, acoustic finishes and coordinated storage solutions.",
  ],
  "about.html": [
    "About HUANGSI Commercial Office Furniture",
    "Learn how Foshan Huangsi Furniture Co., Ltd. supports commercial office projects with coordinated products, OEM options, quality checks and export planning.",
  ],
  "contact.html": [
    "Contact HUANGSI | Request an Office Furniture Quote",
    "Send HUANGSI your office furniture products, quantities, dimensions, finish references, destination and schedule for a commercial project quotation.",
  ],
  "products/acoustic-wall-panels.html": [
    "Acoustic Wall Panel Manufacturer & Supplier | HUANGSI",
    "Source acoustic wall panels for meeting rooms, phone areas and open offices with project-based sizes, colors, patterns and installation requirements.",
  ],
  "products/ergonomic-mesh-office-chair.html": [
    "Ergonomic Mesh Office Chair Manufacturer | HUANGSI",
    "Source ergonomic mesh task chairs with model-based mechanisms, lumbar support, armrests, bases, colors and packing for commercial projects.",
  ],
  "products/executive-office-desk.html": [
    "Executive Office Desk Manufacturer | HUANGSI",
    "Source executive desks with coordinated side storage, cable management, dimensions and finish options for management offices and commercial projects.",
  ],
  "products/filing-cabinet.html": [
    "Office Filing Cabinet Manufacturer | HUANGSI",
    "Source metal and board filing cabinets for document rooms, corporate offices and project storage with model-based sizes, shelves, locks and finishes.",
  ],
  "products/height-adjustable-desk.html": [
    "Height-Adjustable Desk Manufacturer | HUANGSI",
    "Source electric sit-stand office desks with project-based desktop sizes, frame colors, controls, cable management and destination requirements.",
  ],
  "products/modular-office-workstation.html": [
    "Modular Office Workstation Manufacturer | HUANGSI",
    "Plan modular workstation clusters with coordinated desktops, frames, screens, storage and cable management for open-plan commercial offices.",
  ],
  "products/office-chair.html": [
    "Commercial Office Chair Manufacturer | HUANGSI",
    "Explore task, meeting, training and visitor chair options for office furniture distributors, corporate projects, coordinated interiors and bulk orders.",
  ],
  "products/office-desk.html": [
    "Commercial Office Desk Manufacturer | HUANGSI",
    "Source staff, manager and training desks with project-based dimensions, finishes, storage and cable management for commercial office projects.",
  ],
  "products/office-pods.html": [
    "Acoustic Office Pod Manufacturer | HUANGSI",
    "Explore acoustic office pods and phone booths for calls and focused work, with model-based finishes, ventilation, power and project requirements.",
  ],
  "products/office-sofa.html": [
    "Commercial Office Sofa Manufacturer | HUANGSI",
    "Source office sofas and modular lounge seating for reception, waiting and collaborative spaces with project-based upholstery and configurations.",
  ],
  "products/office-storage-cabinet.html": [
    "Office Storage Cabinet Manufacturer | HUANGSI",
    "Source office cabinets, lockers, filing and bookcase storage with project-based dimensions, shelves, locks, finishes and packing requirements.",
  ],
  "products/office-workstation.html": [
    "Office Workstation Manufacturer & Supplier | HUANGSI",
    "Source modular office workstation systems with coordinated layouts, desktops, screens, storage and cable management for commercial projects.",
  ],
  "products/reception-desk.html": [
    "Custom Reception Desk Manufacturer | HUANGSI",
    "Plan custom reception counters for offices, clinics, hotels and schools with project-based dimensions, finishes, storage, branding and cable access.",
  ],
};

const blogs = {
  "blog/ergonomic-mesh-office-chair-bulk-buying-guide.html": {
    title: "Ergonomic Mesh Office Chair Buying Guide for Bulk Orders",
    metaTitle: "Ergonomic Mesh Office Chair Bulk Buying Guide | HUANGSI",
    description: "Compare mesh, mechanisms, lumbar support, armrests, bases, testing, packing and RFQ details when sourcing ergonomic office chairs in bulk.",
    intro: "A chair that looks suitable in a product photo can perform very differently after months of daily use. Commercial buyers should define the user profile, working hours, adjustment range and maintenance expectations before comparing prices. A clear specification also prevents suppliers from quoting different mechanisms, foam densities or base materials under the same general product name.",
    criteria: [
      ["Back and lumbar support", "Confirm whether the backrest tension, lumbar height or lumbar depth can be adjusted. Ask how the mesh is fixed to the frame and whether replacement backs are available for the selected model."],
      ["Seat and mechanism", "Record seat width, depth, height range, foam type and the required tilt functions. A basic swivel-tilt mechanism is not equivalent to a synchronized mechanism with multiple locking positions."],
      ["Arms, base and casters", "Specify fixed, height-adjustable or multi-directional armrests, plus nylon or metal bases. Caster choice should match carpet, resilient flooring or other project surfaces."],
      ["User range and assembly", "Check the recommended user range, gas-lift travel and packed assembly level. Request assembly instructions and a spare-parts list for larger installations."],
    ],
    specs: [
      ["Use profile", "Daily task seating, meeting use, training rooms or executive offices"],
      ["Adjustments", "Seat height, tilt lock, tension, lumbar support, arms and headrest"],
      ["Materials", "Mesh type, seat upholstery, foam, frame, base and casters"],
      ["Project data", "Quantity, color schedule, floor type and expected installation date"],
      ["Documents", "Model drawings, assembly guide and applicable test reports"],
    ],
    custom: "For OEM programs, identify the approved frame color, mesh and fabric references, logo position, carton marks and language required for instructions. Do not approve color from a screen alone when finish consistency matters; request physical swatches or a confirmed sample.",
    packing: "Ask for one-chair carton dimensions, gross weight, packed assembly level and estimated container quantity for the exact configuration. Compact packing may improve freight efficiency, but the installation team then needs more time and properly labeled hardware.",
    quality: "Inspection should cover adjustment functions, abnormal movement or noise, upholstery alignment, caster movement, fastener count and carton protection. Testing requirements must be agreed before quotation because standards and test scope vary by market and project.",
    faqs: [
      ["What should be included in an office chair RFQ?", "Include quantity, user profile, required adjustments, upholstery and frame colors, base material, test requirements, packing preference and destination."],
      ["Should buyers request a chair sample?", "A sample is useful for checking comfort, adjustment logic, finish, assembly and packaging before a large order, subject to the supplier's sample policy."],
      ["How can chair quotations be compared fairly?", "Create one specification sheet and ask each supplier to identify every deviation instead of comparing product photos and headline prices alone."],
    ],
    product: "/products/ergonomic-mesh-office-chair",
    productLabel: "View Ergonomic Mesh Office Chair",
  },
  "blog/office-workstation-vs-office-desk.html": {
    title: "Office Workstation vs Office Desk: Which Fits Your Project?",
    metaTitle: "Office Workstation vs Office Desk: Project Comparison",
    description: "Compare office workstations and individual desks by layout density, privacy, cabling, storage, installation, flexibility and commercial project cost.",
    intro: "An office workstation is a coordinated system for multiple users, while an individual desk is normally planned as a stand-alone position. The best choice depends on team structure, floor plan, privacy, cable routing and how often the office may be reconfigured. Buyers should compare the complete installed solution rather than the desktop price.",
    criteria: [
      ["Space planning", "Bench workstations can use shared legs and screens to create efficient clusters. Individual desks provide more separation but may require wider circulation routes and more repeated components."],
      ["Privacy and collaboration", "Screen height and orientation determine visual privacy more than the product category alone. Teams that collaborate frequently may prefer lower dividers, while focused roles may need higher acoustic or visual separation."],
      ["Power and data", "Workstation systems can coordinate cable trays, access covers and shared power routes. Stand-alone desks are simpler, but floor boxes and wall outlets must still align with each position."],
      ["Change management", "Modular systems help expand or rearrange teams when compatible components remain available. Individual desks can move independently but may be harder to align into a consistent open-plan layout."],
    ],
    specs: [
      ["Layout input", "Scaled floor plan, column positions, doors, circulation and floor boxes"],
      ["User count", "Current headcount, growth allowance and team groupings"],
      ["Privacy", "Screen height, acoustic needs and orientation"],
      ["Services", "Power modules, cable trays, CPU holders and monitor arms"],
      ["Installation", "Delivery access, floor protection, assembly sequence and waste removal"],
    ],
    custom: "Workstation customization usually centers on cluster size, desktop dimensions, screen materials, storage, cable routing and finish coordination. For individual desks, side cabinets, modesty panels and matching storage often have a larger effect on the final specification.",
    packing: "Request packing lists grouped by workstation cluster or installation zone. Clear component labels reduce site sorting time, especially when frames, screens and desktops are packed separately. Confirm whether spare connectors and hardware are included.",
    quality: "Trial-assemble at least one representative configuration before mass packing. Check frame stability, joint alignment, screen positions, edge consistency and compatibility between cable-management components and the approved layout.",
    faqs: [
      ["Are workstations always cheaper than individual desks?", "Not always. Shared frames can improve efficiency, but screens, power systems, storage and installation must be included in the comparison."],
      ["Which option is better for a growing company?", "A modular workstation can support planned expansion when the same system remains available, while individual desks offer simple one-by-one movement."],
      ["What floor-plan information does a supplier need?", "Provide room dimensions, columns, doors, circulation routes, floor boxes, team sizes and any accessibility or egress constraints."],
    ],
    product: "/products/office-workstation",
    productLabel: "View Office Workstations",
  },
  "blog/reception-desk-buying-guide.html": {
    title: "Reception Desk Buying Guide for Offices, Clinics and Hotels",
    metaTitle: "Reception Desk Buying Guide for Commercial Projects",
    description: "Plan reception counter size, visitor experience, accessibility, storage, cable management, finishes, branding, packing and installation for commercial projects.",
    intro: "The reception desk is both a working position and the visual anchor of a lobby. Its specification must balance staff ergonomics, visitor approach, accessibility, equipment, storage, brand finishes and site installation. A front elevation alone is not enough for an accurate quotation; the supplier also needs the working-side layout and site constraints.",
    criteria: [
      ["Visitor and staff zones", "Define the transaction height, seated work surface, monitor position and the number of reception staff. Allow clear knee space and decide where visitors complete forms or receive documents."],
      ["Accessibility", "Confirm applicable local requirements with the project designer. An accessible counter section may require a different height, clear approach space and knee clearance than the main standing counter."],
      ["Equipment and storage", "List monitors, printers, telephones, access-control equipment, drawers and files. Their dimensions determine cable openings, ventilation, shelves and lockable storage."],
      ["Finish and branding", "Specify front-panel materials, countertop finish, lighting, signage and logo method. Curved, fluted or stone-look features may change construction, packing and installation requirements."],
    ],
    specs: [
      ["Site data", "Lobby plan, wall dimensions, floor level and delivery access"],
      ["Counter size", "Overall width, depth, staff work height and visitor transaction height"],
      ["Equipment", "Monitor, printer, power, data, access control and storage"],
      ["Finishes", "Front elevation, worktop, side panels, hardware and logo treatment"],
      ["Installation", "Module sizes, joining method, wall fixing and site responsibility"],
    ],
    custom: "Provide brand guidelines, material references and an approved front elevation before production. For large counters, confirm how the design divides into transportable modules and where joints will appear. Lighting and signage normally require coordination with local electrical and branding contractors.",
    packing: "Reception counters are vulnerable at corners and decorative faces. Request protected edges, labeled modules and a packing sequence that matches installation. Check door, lift and corridor dimensions before approving module sizes.",
    quality: "Inspect visible joints, color consistency, countertop alignment, drawer and door functions, cable openings and front-panel details. A pre-assembly check is especially valuable for curved or multi-module counters.",
    faqs: [
      ["What drawings are needed for a reception desk quote?", "Provide a floor plan, front elevation, working-side layout, dimensions, finish references, equipment list and delivery-access details."],
      ["Can a reception desk include an accessible section?", "Yes, but its dimensions and approach space should be confirmed by the project designer against the rules that apply at the installation location."],
      ["How should a large counter be shipped?", "It is normally divided into labeled modules sized for transport access, with protected decorative faces and a documented joining sequence."],
    ],
    product: "/products/reception-desk",
    productLabel: "View Reception Desks",
  },
  "blog/acoustic-wall-panels-for-office-meeting-rooms.html": {
    title: "Acoustic Wall Panels for Meeting Rooms and Workspaces",
    metaTitle: "Office Acoustic Wall Panels: Buyer Guide | HUANGSI",
    description: "Understand acoustic panel placement, coverage, material, thickness, fire requirements, finishes, installation and RFQ details for offices and meeting rooms.",
    intro: "Acoustic panels can reduce reflected sound and improve speech comfort, but they do not block sound transmission through walls, doors or ceilings. Buyers should first identify whether the problem is reverberation inside a room, speech privacy between rooms or mechanical noise. Wall panels mainly address reverberation and should be coordinated with the room geometry and other finishes.",
    criteria: [
      ["Problem definition", "Record room dimensions, hard surfaces, occupancy and the activity causing difficulty. Meeting rooms, call areas and open offices may require different treatment strategies."],
      ["Coverage and placement", "Panel area and location matter as much as the material. Spread treatment across useful reflection surfaces instead of placing every panel in one decorative cluster without acoustic review."],
      ["Material and safety", "Confirm substrate, facing, edge construction, thickness, cleanability and any required fire-performance documentation for the destination market."],
      ["Visual coordination", "Choose colors, patterns, seams and fixing methods together. Custom cutting and printed graphics can support branding but require approved artwork and tolerances."],
    ],
    specs: [
      ["Room input", "Dimensions, ceiling height, photos, floor plan and main sound concern"],
      ["Panel system", "Material, thickness, density, edge profile and module size"],
      ["Performance", "Available absorption data and relevant test method"],
      ["Safety", "Applicable fire, emissions or material documentation"],
      ["Installation", "Substrate, adhesive or mechanical fixing, joints and maintenance access"],
    ],
    custom: "Customization may include panel size, color, bevels, grooves, perforation patterns or graphics. Confirm how custom cutting changes exposed edges and installation numbering. Printed colors should be approved using a production-relevant sample when brand matching is important.",
    packing: "Panels should remain flat, dry and protected from crushed corners or surface abrasion. Packing labels can identify elevations or installation zones. Ask whether adhesives, clips or trims are included and whether they are suitable for the local substrate.",
    quality: "Check dimensions, squareness, color consistency, surface marks, edge finish and pattern alignment. Performance documents should refer to the quoted material and thickness rather than a different panel construction.",
    faqs: [
      ["Do acoustic wall panels soundproof a meeting room?", "No. They primarily absorb reflections inside the room. Sound isolation between rooms depends on the complete wall, door, ceiling and service penetrations."],
      ["How much acoustic panel coverage is required?", "It depends on room volume, existing finishes, occupancy and the target condition. A project acoustician should confirm critical spaces."],
      ["What should an acoustic panel RFQ include?", "Include room dimensions, photos, desired finish, panel size and thickness, installation surface, safety requirements, quantity and destination."],
    ],
    product: "/products/acoustic-wall-panels",
    productLabel: "View Acoustic Wall Panels",
  },
  "blog/office-furniture-packaging-and-loading-guide.html": {
    title: "Office Furniture Packaging and Container Loading Guide",
    metaTitle: "Office Furniture Packaging & Loading Guide | HUANGSI",
    description: "Plan KD packing, carton protection, labels, CBM, gross weight, pallets and mixed-category container loading for bulk office furniture export orders.",
    intro: "Export packaging affects damage risk, freight cost, unloading speed and installation efficiency. The correct method depends on the product structure, finish sensitivity, transport route and receiving capability. Buyers should request model-specific carton data instead of relying on a general container estimate before the final product mix is approved.",
    criteria: [
      ["KD versus assembled packing", "Knock-down packing can reduce volume but increases site assembly. More assembled packing may protect complex alignment and save labor, while using additional container space."],
      ["Carton protection", "Review corner protection, surface films, foam or honeycomb layers, hardware bags and moisture protection. Decorative panels and glass require product-specific solutions."],
      ["Labels and packing lists", "Carton marks should connect each package to a model, color, room or installation zone. Clear numbering reduces sorting errors in mixed-category projects."],
      ["Container planning", "Use final carton dimensions and gross weights to prepare the loading plan. Weight distribution, unloading order and fragile zones matter in addition to theoretical cubic volume."],
    ],
    specs: [
      ["Per carton", "Model, package number, dimensions, net weight and gross weight"],
      ["Protection", "Surface film, foam, corner guards, inner dividers and outer carton"],
      ["Hardware", "Bag labels, spare quantity and assembly instructions"],
      ["Container", "Estimated 20GP/40HQ quantity after final packing approval"],
      ["Mixed loading", "Product sequence, weight distribution and unloading priority"],
    ],
    custom: "Private-label packaging may include carton artwork, shipping marks, barcodes, instruction languages and hardware labels. Confirm artwork responsibility, print colors and approval timing before production; late carton changes can affect the shipment schedule.",
    packing: "Request photos or a packing sample for new or high-risk products. Container estimates should be updated after the exact model mix, carton sizes and pallet decisions are locked. Pallets simplify handling in some markets but reduce usable internal volume.",
    quality: "Packing inspection should verify the right product and finish, complete hardware, readable labels, protected edges, carton condition and package count. Loading records can include container number, seal number and staged photographs where agreed.",
    faqs: [
      ["What is needed for an accurate container estimate?", "The supplier needs final product quantities, approved configurations, carton dimensions, gross weights and any pallet requirements."],
      ["Is the smallest carton always the best option?", "No. Extreme compactness can increase assembly labor or damage risk. The packaging method should balance protection, freight and installation."],
      ["How should mixed office furniture be labeled?", "Use model, color, package sequence and project-zone references so the receiving team can sort cartons before installation."],
    ],
    product: "/packaging-loading",
    productLabel: "Review Packaging & Loading",
  },
  "blog/executive-office-desk-materials-and-size-guide.html": {
    title: "Executive Office Desk Materials and Size Guide",
    metaTitle: "Executive Office Desk Materials & Size Guide | HUANGSI",
    description: "Compare executive desk dimensions, layouts, panel materials, veneers, finishes, storage, cable management, packing and project specification details.",
    intro: "An executive desk must fit the room, support daily equipment and present a coordinated finish from every visible direction. Size alone does not define quality: edge construction, substrate, surface finish, hardware, storage layout and cable access all affect performance. Buyers should approve a dimensioned configuration rather than a reference image only.",
    criteria: [
      ["Room and orientation", "Confirm the desk position, visitor seating, circulation and whether the return is left- or right-handed. Check door, window and floor-box locations on the plan."],
      ["Work surface", "Define desktop length, depth and height plus monitor, laptop and meeting needs. Oversized desks can restrict circulation or create long cable routes."],
      ["Materials and edges", "Clarify substrate, surface finish, edge material and edge thickness. Melamine, painted panels and natural or engineered veneers have different appearance, care and consistency considerations."],
      ["Storage and services", "List drawers, filing, open shelves, lock requirements, power modules and cable paths. Side cabinets may also support the desktop and determine its orientation."],
    ],
    specs: [
      ["Configuration", "Straight, L-shaped, desk with return, side cabinet or credenza"],
      ["Dimensions", "Overall size, worktop thickness, knee space and storage modules"],
      ["Finish", "Substrate, surface, edge, color reference and grain direction"],
      ["Hardware", "Hinges, slides, locks, handles and cable-management parts"],
      ["Site", "Room plan, delivery access, assembly space and floor-box location"],
    ],
    custom: "Custom work may cover dimensions, veneer or panel color, modesty panels, storage, meeting extensions, power modules and branded details. Confirm grain direction and panel matching for premium wood-look finishes. Physical samples are more reliable than screen references.",
    packing: "Large tops and decorative panels need edge and face protection. Verify whether the desk ships flat-packed or in modules and check lift, door and corridor sizes. Label left/right returns and matching storage to prevent installation errors.",
    quality: "Trial assembly should check level surfaces, joint alignment, drawer movement, door gaps, locks, cable covers and visible finish consistency. For veneer or patterned surfaces, agree how natural variation or repeated patterns will be handled.",
    faqs: [
      ["What size should an executive desk be?", "The correct size depends on room dimensions, circulation, equipment and visitor use. Approve the layout on a scaled plan before production."],
      ["Which finish is easiest for multi-office consistency?", "Commercial decorative panels often offer repeatable colors, while natural veneer has intentional variation. The choice depends on the design and maintenance brief."],
      ["What should be shown on the desk drawing?", "Show overall dimensions, return direction, storage, knee space, cable openings, power modules, finishes and all visible elevations."],
    ],
    product: "/products/executive-office-desk",
    productLabel: "View Executive Office Desks",
  },
  "blog/how-to-customize-office-furniture-for-corporate-projects.html": {
    title: "How to Customize Office Furniture for Corporate Projects",
    metaTitle: "Custom Office Furniture Project Planning Guide | HUANGSI",
    description: "Create a controlled custom office furniture brief covering drawings, dimensions, finishes, samples, power, branding, packing, approvals and quality checks.",
    intro: "Customization works best when every decision is captured in one controlled specification. Reference images communicate design intent, but they do not define dimensions, materials, hardware, performance or tolerances. A structured approval process reduces quotation revisions and prevents different teams from working from different versions.",
    criteria: [
      ["Define scope", "List rooms, product types, quantities and responsibility for measuring, design, power, delivery and installation. Separate standard products from genuinely custom items."],
      ["Create a specification", "Use dimensioned drawings, finish codes, hardware descriptions and performance requirements. Mark which details are fixed and where alternatives may be proposed."],
      ["Approve samples", "Decide whether approval requires material swatches, color samples, a component mock-up or a complete pre-production unit. Record the accepted sample and date."],
      ["Control revisions", "Give each drawing and schedule a revision number. Changes after sample or production approval should identify cost, lead-time and packing effects before acceptance."],
    ],
    specs: [
      ["Project schedule", "RFQ, drawing review, sample approval, production, inspection and shipment"],
      ["Drawings", "Plans, elevations, dimensions, interfaces and cable routes"],
      ["Finish schedule", "Materials, colors, edges, fabrics, metal coatings and hardware"],
      ["Branding", "Logo artwork, position, method, color and carton marks"],
      ["Approval record", "Signed sample, revision number and authorized decision maker"],
    ],
    custom: "Prioritize changes that create buyer value: dimensions that fit the layout, coordinated finishes, power integration, storage and serviceability. Unnecessary one-off details may increase tooling, sample cycles, minimum quantities or replacement-part complexity.",
    packing: "Include the receiving and installation teams in packaging decisions. Carton labels can reference rooms or floors, instructions may need local languages, and module sizes must fit lifts and corridors. Confirm who disposes of packing material at the site.",
    quality: "Inspect against the approved drawing, finish sample and packing specification—not against a general product photo. The checklist should identify critical dimensions, visible surfaces, functions, hardware, labels and required documentation.",
    faqs: [
      ["What should a custom furniture RFQ contain?", "Include quantities, drawings, dimensions, materials, finish references, performance needs, destination, schedule, packing and installation responsibilities."],
      ["When is a full pre-production sample needed?", "It is most useful for new structures, important visible details or large repeat orders where a mistake would be costly."],
      ["How can buyers reduce custom-project delays?", "Assign one approval owner, use revision-controlled documents and resolve power, finishes, access and packaging before production release."],
    ],
    product: "/oem-manufacturing",
    productLabel: "Review OEM Manufacturing",
  },
  "blog/height-adjustable-desk-vs-traditional-office-desk.html": {
    title: "Height-Adjustable Desk vs Traditional Office Desk",
    metaTitle: "Height-Adjustable vs Fixed Office Desk | Buyer Guide",
    description: "Compare sit-stand and fixed office desks by user needs, frame stability, motors, controls, power, cable management, maintenance, packing and project cost.",
    intro: "Height-adjustable and fixed desks can use similar desktops, but their frames, services and long-term support requirements differ. A sit-stand desk adds movement and user adjustment; a fixed desk offers simpler construction and predictable cable routing. Project teams should match the choice to workplace policy, user needs and maintenance capacity.",
    criteria: [
      ["User experience", "Sit-stand desks allow posture changes and sharing between users of different heights. Fixed desks are familiar and may suit areas where equipment height and configuration must remain constant."],
      ["Frame and stability", "For adjustable models, review height range, lifting columns, load rating, travel speed and stability at raised height. Desktop size must remain within the approved frame range."],
      ["Controls and power", "Define basic up/down controls, memory positions, collision response and cable slack throughout travel. Power and data cables must move safely without pulling or tangling."],
      ["Service and lifecycle", "Ask how controllers, motors, columns and handsets are identified and replaced. Fixed desks have fewer electromechanical parts but still require durable connections and edges."],
    ],
    specs: [
      ["Desk type", "Electric sit-stand, manual adjustable or fixed-height"],
      ["Dimensions", "Desktop size, height range, frame width and load requirement"],
      ["Electrical", "Destination voltage, plug, controller, motors and power modules"],
      ["Cable plan", "Tray, spine, floor-box position and movement allowance"],
      ["Support", "Assembly guide, fault information and replaceable component list"],
    ],
    custom: "Both desk types can use custom desktop colors, sizes, edges and cable openings. Adjustable frames may also offer frame colors, handset choices and power accessories. Confirm that every custom desktop remains compatible with the frame geometry.",
    packing: "Adjustable desks normally include separate frame, desktop and electrical components. Labels and protected cable assemblies help installers identify parts. Compare freight volume together with assembly time and site testing requirements.",
    quality: "For sit-stand desks, test full travel, controls, noise, synchronization, stability, cable clearance and repeated operation. For fixed desks, focus on level surfaces, frame connections, edge quality and alignment. Both need complete hardware and accurate instructions.",
    faqs: [
      ["Are height-adjustable desks suitable for every workstation?", "They can support flexible use, but budget, power access, cable routing, maintenance and the workplace brief should be reviewed first."],
      ["What electrical details belong in the RFQ?", "State destination voltage and plug, controller requirements, motor configuration, power accessories and any required documentation."],
      ["How should sit-stand desks be inspected?", "Check assembly, full height travel, controls, load behavior, stability, cable clearance, noise and the identification of replaceable electrical parts."],
    ],
    product: "/products/height-adjustable-desk",
    productLabel: "View Height-Adjustable Desks",
  },
  "blog/how-to-choose-office-workstations-for-commercial-projects.html": {
    title: "How to Choose Office Workstations for Commercial Projects",
    metaTitle: "How to Choose Office Workstations for Projects",
    description: "Specify office workstation layouts, cluster sizes, screens, frames, storage, power, cabling, finishes, packing and installation for commercial projects.",
    intro: "Workstation selection begins with the floor plan and operating model, not a product image. Team size, circulation, power locations, privacy and future change determine the appropriate cluster and dimensions. A coordinated workstation schedule lets the furniture supplier, electrical team and installer resolve interfaces before delivery.",
    criteria: [
      ["Cluster planning", "Choose two-, four-, six-person or linear arrangements based on team groups and room geometry. Confirm end conditions where a run stops at a wall, aisle or column."],
      ["Desktop and frame", "Define individual user width and depth, frame structure, leg positions and stability. Check that under-desk storage and chairs do not conflict with supports."],
      ["Screens and privacy", "Select screen height, material and mounting according to visual privacy, pinning, cleaning and acoustic needs. Screen dimensions should align with desktop modules."],
      ["Power and accessories", "Coordinate floor boxes, cable trays, access covers, power modules, monitor arms and CPU storage. Assign responsibility for electrical components and local connection."],
    ],
    specs: [
      ["Floor plan", "Scaled dimensions, columns, doors, aisles, floor boxes and egress"],
      ["Module", "Users per cluster, desktop size, orientation and end conditions"],
      ["Components", "Frames, screens, storage, cable trays, power and accessories"],
      ["Finish schedule", "Desktop, edge, frame, screen and storage colors"],
      ["Delivery", "Zone labels, access, assembly sequence and installation responsibility"],
    ],
    custom: "Typical project customization includes desktop dimensions, screen materials, frame color, cable openings, storage and accessories. Maintain repeatable module sizes where possible so damaged parts and future additions are easier to manage.",
    packing: "Pack and label components by cluster, floor or installation zone. A detailed packing list should distinguish shared frames, end legs, screens, tops and hardware. Confirm whether the installer receives pre-sorted kits or must sort bulk packages on site.",
    quality: "Trial-assemble a representative cluster and check alignment, stability, screen positions, edge finish, cable access and storage clearance. Compare production components with the approved layout and finish schedule before packing.",
    faqs: [
      ["What is the first document needed for workstation planning?", "A scaled floor plan showing dimensions, doors, columns, circulation and power locations is the most useful starting point."],
      ["How much space should each workstation use?", "The correct module depends on tasks, equipment, local planning rules and circulation. The project designer should confirm the final layout."],
      ["Can workstation colors and screens be customized?", "Common options include desktop and frame colors, screen materials, sizes and cable accessories, subject to the selected system and order scope."],
    ],
    product: "/products/modular-office-workstation",
    productLabel: "View Modular Workstations",
  },
  "blog/office-storage-cabinet-buying-guide.html": {
    title: "Office Storage Cabinet Buying Guide for Commercial Spaces",
    metaTitle: "Office Storage Cabinet Buying Guide | HUANGSI",
    description: "Compare office cabinet dimensions, board and metal construction, shelves, locks, filing, anchoring, finishes, packing and project RFQ requirements.",
    intro: "Office storage should be specified around what is stored, who needs access and where the cabinet sits. Filing formats, archive boxes, personal items, supplies and display objects require different internal dimensions and hardware. Safety, anchoring and replacement keys are as important as the exterior finish in commercial environments.",
    criteria: [
      ["Storage function", "List file sizes, binders, boxes, personal belongings or equipment. Define shelf spacing, hanging-file direction, drawer loads and whether doors must open within a narrow aisle."],
      ["Construction", "Clarify board or metal construction, panel thickness, edge treatment, back panel and shelf supports. Tall units may require wall anchoring according to the site condition."],
      ["Locks and access", "Specify individual keys, master-key needs, digital locks or no locks. Plan how spare keys, lock codes and replacement cylinders will be managed."],
      ["Layout and finish", "Coordinate cabinet width, height and depth with workstations, skirting, sockets and sprinkler or ventilation clearances. Record color and handle references."],
    ],
    specs: [
      ["Contents", "Files, binders, boxes, personal storage, supplies or display"],
      ["Configuration", "Doors, drawers, open shelves, lockers and adjustable shelves"],
      ["Dimensions", "Overall size, clear internal size and shelf spacing"],
      ["Security", "Lock type, keying plan, master keys and replacement method"],
      ["Site safety", "Floor level, wall fixing, anchoring responsibility and local requirements"],
    ],
    custom: "Project options may include dimensions, door combinations, shelf count, colors, handles, labels and lock systems. Standardize cabinet modules and keys where possible to simplify facility management and future replacement.",
    packing: "Cabinets may ship assembled or knock-down depending on structure, volume and site labor. Assembled units use more space but reduce installation; flat-packed units need clear part labels and reliable instructions. Protect corners, doors and visible faces.",
    quality: "Check cabinet squareness, door and drawer alignment, shelf fit, lock operation, key labels, anti-tip provisions and finish consistency. Load or function tests should match the agreed product design and use case.",
    faqs: [
      ["Should office storage ship assembled or flat-packed?", "The choice depends on freight volume, structure, site access and installation labor. Compare total landed and installed cost."],
      ["Do tall cabinets need anchoring?", "Tall units may present a tip risk. The project team should assess the product, floor and wall condition and follow applicable local requirements."],
      ["What information is needed for a cabinet quote?", "Provide quantity, overall and internal dimensions, stored items, door and shelf configuration, lock plan, finish, packing preference and destination."],
    ],
    product: "/products/office-storage-cabinet",
    productLabel: "View Office Storage Cabinets",
  },
};

const catalogMain = `<h2>Find the right product range for your project</h2><p>HUANGSI supplies coordinated commercial office furniture categories rather than a single universal catalog file. Tell us which products and market you are working with, and we will prepare the most relevant current digital catalog and quotation information for your inquiry.</p><div class="grid cols-3"><div class="card"><h3>Desks &amp; Workstations</h3><p>Staff desks, executive desks, height-adjustable desks and modular workstation systems for private and open-plan offices.</p><a class="text-link" href="/office-desks">Explore desks →</a></div><div class="card"><h3>Seating &amp; Reception</h3><p>Ergonomic task chairs, visitor seating, office sofas and reception counters for commercial interiors.</p><a class="text-link" href="/office-chairs">Explore seating →</a></div><div class="card"><h3>Storage &amp; Acoustics</h3><p>Office cabinets, filing storage, acoustic wall panels and office pods for organized, focused workplaces.</p><a class="text-link" href="/office-storage">Explore storage →</a></div></div><h2 id="specs">Information needed for the relevant catalog</h2><p>Include the product categories, intended use, approximate quantity and destination market. If you already have a floor plan, product reference or tender schedule, attach or mention it in your email so the response can focus on suitable models.</p><table class="spec-table"><tr><th>Product scope</th><td>Workstations, desks, chairs, reception, storage, sofas, acoustic panels or mixed categories</td></tr><tr><th>Project type</th><td>Distributor range, corporate office, school, clinic, hotel, co-working space or another commercial interior</td></tr><tr><th>Commercial input</th><td>Estimated quantities, target schedule and destination port or city</td></tr><tr><th>Technical input</th><td>Dimensions, finish references, floor plan, test needs and local electrical requirements where relevant</td></tr></table><h2 id="custom">OEM and customization options</h2><p>Model-based options can include dimensions, colors, decorative panels, upholstery, frames, screens, storage, accessories, logo application, carton marks and instruction languages. Every requested change should be identified in the RFQ so the catalog selection and quotation refer to the same scope.</p><h2 id="packing">Packaging and loading information</h2><p>Carton dimensions, weights, CBM and estimated container quantities depend on the exact model and configuration. Request packing data after the shortlist is confirmed. Mixed-category loading can then be reviewed against the approved quantities and destination requirements.</p><h2 id="quality">Quality and documentation</h2><p>Tell us which product documents, samples or test reports your project requires. Availability and applicability must be confirmed for the selected model, material, configuration and destination rather than assumed from a general product category.</p><h2 id="faq">Catalog request questions</h2><h3>Is there one catalog covering every available model?</h3><p>Product ranges and options change, so the most useful response is a current category-specific selection based on your project scope.</p><h3>What should I send with a catalog request?</h3><p>Send product categories, quantities, market, destination and any drawings or reference images. This helps avoid receiving an irrelevant general brochure.</p><h3>Can I request prices with the catalog?</h3><p>Yes. Pricing requires the selected products, configuration, quantity, packing requirements and destination details.</p><div class="cta-band"><h2>Request the relevant digital catalog</h2><p>Send your product categories, quantities and destination. We will use the information to prepare a focused response for your project.</p><a class="btn gold" href="/contact">Request Catalog &amp; Quote</a></div>`;

const authorityPageMains = {
  "oem-manufacturing.html": `<h2>OEM office furniture project workflow</h2><p>Custom office furniture should move through a controlled sequence from RFQ to approved production documents. HUANGSI reviews the product type, quantity, dimensions, finishes, accessories, destination and schedule before confirming which customization requests can be supported for the selected models.</p><div class="grid cols-3"><div class="card"><h3>1. Requirement Review</h3><p>Product lists, drawings, floor plans, reference images and finish requirements are checked for missing dimensions and commercial assumptions.</p></div><div class="card"><h3>2. Sample &amp; Approval</h3><p>The required approval level—material swatch, finish sample, component mock-up or complete unit—is agreed according to the project risk.</p></div><div class="card"><h3>3. Production Release</h3><p>Mass production should refer to the approved revision, finish reference, packing method and documented inspection points.</p></div></div><h2 id="specs">What to include in an OEM specification</h2><table class="spec-table"><tr><th>Product definition</th><td>Model or drawing, dimensions, configuration, quantities and intended use</td></tr><tr><th>Materials</th><td>Panel, metal, upholstery, foam, hardware and finish references</td></tr><tr><th>Interfaces</th><td>Power, cable management, storage, accessories and site constraints</td></tr><tr><th>Commercial details</th><td>Destination, schedule, packing, labels, instruction language and documentation</td></tr></table><h2 id="custom">Customization and drawing control</h2><p>Common project options include dimensions, desktop and frame colors, screens, upholstery, storage, handles, cable openings, logo application and carton marks. Each drawing and finish schedule should carry a revision number. If a detail changes after approval, its effect on cost, lead time, tooling and packing should be reviewed before release.</p><h2 id="packing">OEM packing and labeling</h2><p>Private-label packing can include carton artwork, model codes, barcodes, shipping marks, room or floor references and localized instructions. Module sizes must also fit the receiving site's doors, lifts and corridors. Final carton data is model-specific and should be confirmed after the product configuration is approved.</p><h2 id="quality">Approval and quality checkpoints</h2><p>Inspection criteria should be based on the approved drawing and sample. Typical checks can cover critical dimensions, visible finish, assembly, functions, hardware, labels and carton protection. Any required test reports must match the selected model, materials and destination requirements.</p><h2 id="faq">OEM project questions</h2><h3>What is the best starting point for a custom quote?</h3><p>Send a product list with quantities, dimensioned drawings or references, finish requirements, destination and target schedule.</p><h3>Does every custom project need a full sample?</h3><p>No. The appropriate approval level depends on structural change, finish risk, order quantity and the cost of correcting a mistake.</p><h3>How can revision mistakes be reduced?</h3><p>Use one approved drawing set, one finish schedule and a named decision maker for every production release.</p><div class="cta-band"><h2>Review an OEM office furniture project</h2><p>Send your controlled specification or current concept documents for scope review.</p><a class="btn gold" href="/contact">Request OEM Quote</a></div>`,
  "packaging-loading.html": `<h2>Export packing based on the approved product mix</h2><p>Office furniture packaging affects protection, freight volume, unloading and installation labor. HUANGSI reviews packing around the exact product structure, finish sensitivity, destination and receiving method. General container quantities should not replace model-specific carton data.</p><div class="grid cols-3"><div class="card"><h3>Product Protection</h3><p>Visible faces, corners, hardware and moving components need protection appropriate to the selected material and transport route.</p></div><div class="card"><h3>Freight Efficiency</h3><p>KD structures can reduce volume, while more assembled packing may reduce site labor. The right balance depends on the project.</p></div><div class="card"><h3>Installation Flow</h3><p>Clear package numbering and zone labels help receiving teams sort mixed products before assembly.</p></div></div><h2 id="specs">Packing data to request</h2><table class="spec-table"><tr><th>Per package</th><td>Model, package number, carton dimensions, net weight and gross weight</td></tr><tr><th>Protection</th><td>Surface film, foam, edge guards, inner dividers, hardware bags and outer carton</td></tr><tr><th>Handling</th><td>Assembled or KD structure, pallet option, lift points and fragile surfaces</td></tr><tr><th>Container estimate</th><td>20GP or 40HQ quantity calculated from the final approved cartons and product mix</td></tr></table><h2 id="custom">Carton marks and private labeling</h2><p>Project packing may include buyer marks, model and color codes, barcodes, instruction languages, hardware labels and room or floor references. Artwork, print color and approval timing should be confirmed before production because late carton changes can affect the shipment schedule.</p><h2 id="packing">Mixed-category container planning</h2><p>A loading plan should consider carton size, gross weight, stacking strength, unloading order and fragile zones—not only theoretical CBM. Heavy items are distributed carefully, and products needed first at the destination can be positioned according to the agreed unloading plan where practical.</p><h2 id="quality">Packing and loading checks</h2><p>Before loading, checks can confirm the product and finish, complete hardware, readable labels, protected edges, sound cartons and package count. Where agreed, loading records can include staged photographs, container number and seal information.</p><h2 id="faq">Packaging questions</h2><h3>When can accurate container quantities be confirmed?</h3><p>After the exact product configurations, quantities, carton sizes, weights and pallet requirements are approved.</p><h3>Is flat packing always more economical?</h3><p>Not necessarily. Freight savings should be compared with assembly labor, installation schedule and product-protection risk.</p><h3>How should a mixed office project be labeled?</h3><p>Use model, finish, package sequence and project-zone references so components can be sorted before installation.</p><div class="cta-band"><h2>Request model-specific packing data</h2><p>Send the product list, quantities and destination for a packing and loading review.</p><a class="btn gold" href="/contact">Discuss Packing &amp; Loading</a></div>`,
  "quality-control.html": `<h2>Quality checks tied to the approved specification</h2><p>Office furniture inspection is most useful when it refers to the accepted model, drawing, finish sample and packing method. Different products require different checks: a chair has adjustment functions, a workstation has repeated connections, and a reception counter may depend on visible multi-module alignment.</p><div class="grid cols-3"><div class="card"><h3>Before Production</h3><p>Confirm drawings, dimensions, finish references, hardware, product documents and the inspection checklist.</p></div><div class="card"><h3>During Production</h3><p>Review materials, first assemblies, visible finishes and critical functions early enough to correct deviations.</p></div><div class="card"><h3>Before Shipment</h3><p>Check representative finished products, labels, hardware, carton protection and the approved package count.</p></div></div><h2 id="specs">Information that defines the inspection</h2><table class="spec-table"><tr><th>Reference documents</th><td>Approved drawing, bill of materials, finish sample and order specification</td></tr><tr><th>Critical features</th><td>Dimensions, stability, moving functions, alignment, locks, cables and accessories</td></tr><tr><th>Appearance</th><td>Visible surfaces, edge finish, upholstery, color consistency and acceptable variation</td></tr><tr><th>Packing</th><td>Hardware count, labels, instructions, protective materials and carton condition</td></tr></table><h2 id="custom">Custom-product approval</h2><p>Custom dimensions and finishes increase the importance of a signed sample or controlled reference. The approval record should state which aspects are accepted and which remain subject to normal production variation. Screens and online images should not be the only color reference for important projects.</p><h2 id="packing">Pre-shipment packing verification</h2><p>Inspection can confirm that the right product, configuration and finish are in the correctly labeled package. Hardware bags and instructions should correspond to the installation sequence, while visible faces and vulnerable corners need appropriate protection.</p><h2 id="quality">Product-specific checkpoints</h2><p>Chair checks may include adjustments, movement and noise; desks and workstations may require stability, joint and cable-access checks; cabinets need door, drawer, shelf and lock checks. Any load or performance test must follow an agreed method and scope.</p><h2 id="faq">Quality control questions</h2><h3>Can one checklist cover every office furniture category?</h3><p>No. A shared project checklist is useful, but product-specific functions and risks need their own inspection points.</p><h3>When should inspection criteria be agreed?</h3><p>Before production release, so quotations, samples and production teams work to the same requirements.</p><h3>Do test reports apply to every similar-looking model?</h3><p>Not automatically. Confirm that the report covers the quoted construction, materials and configuration required by the destination market.</p><div class="cta-band"><h2>Define your project quality requirements</h2><p>Include inspection, documentation and test needs in the RFQ for model-based review.</p><a class="btn gold" href="/contact">Discuss Quality Requirements</a></div>`,
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function updateMetadata(html, title, description) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*">/i,
      `<meta name="description" content="${safeDescription}">`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*">/i,
      `<meta property="og:title" content="${safeTitle}">`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*">/i,
      `<meta property="og:description" content="${safeDescription}">`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*">/i,
      `<meta name="twitter:title" content="${safeTitle}">`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*">/i,
      `<meta name="twitter:description" content="${safeDescription}">`,
    );
}

function renderBlog(article) {
  const criteria = article.criteria
    .map(([heading, text]) => `<li><strong>${heading}:</strong> ${text}</li>`)
    .join("");
  const specs = article.specs
    .map(([heading, text]) => `<tr><th>${heading}</th><td>${text}</td></tr>`)
    .join("");
  const faqs = article.faqs
    .map(([question, answer]) => `<h3>${question}</h3><p>${answer}</p>`)
    .join("");

  return `<h2>How to use this buying guide</h2><p>${article.intro}</p><h2>Key project decisions</h2><ul>${criteria}</ul><h2 id="specs">Information to put in the specification</h2><table class="spec-table">${specs}</table><h2 id="custom">Customization and approval</h2><p>${article.custom}</p><h2 id="packing">Packaging and project delivery</h2><p>${article.packing}</p><h2 id="quality">Quality checks before shipment</h2><p>${article.quality}</p><h2>How to compare supplier proposals</h2><p>Send the same controlled specification to every shortlisted supplier and require them to identify exclusions or alternatives. Compare the complete configuration, approval process, packing, documentation and destination costs instead of the headline unit price alone. Product names are not standardized, so two quotations may describe materially different constructions under a similar label.</p><ol><li>Confirm that dimensions, materials and functions match the RFQ.</li><li>List every proposed substitution and decide whether a new sample is required.</li><li>Compare carton data, installation work and spare-part support together with price.</li><li>Record the quotation revision used for final drawing and sample approval.</li></ol><p>Keep the approved drawing, finish reference, quotation and inspection checklist connected by model or project code. This creates a clearer audit trail when several products, colors or installation zones are included in one order.</p><h2 id="faq">Frequently asked questions</h2>${faqs}<h2>Related product</h2><p><a class="btn secondary" href="${article.product}">${article.productLabel}</a></p><div class="cta-band"><h2>Prepare a comparable supplier quotation</h2><p>Send your product list, quantity, drawings or floor plan, finish references and destination so the project scope can be reviewed.</p><a class="btn gold" href="/contact">Request Project Quote</a></div>`;
}

function faqSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

function breadcrumbSchema(html, relativePath) {
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim();
  if (!canonical || !h1 || relativePath === "index.html") return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://huangsifurniture.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: h1,
        item: canonical,
      },
    ],
  };
}

function addJsonLd(html, schema, marker) {
  if (!schema || html.includes(marker)) return html;
  return html.replace(
    "</head>",
    `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`,
  );
}

function improveForms(html, relativePath) {
  let formIndex = 0;
  return html.replace(/<form\b[^>]*data-rfq-form[^>]*>[\s\S]*?<\/form>/gi, (form) => {
    formIndex += 1;
    const prefix = `rfq-${relativePath.replace(/[^a-z0-9]+/gi, "-")}-${formIndex}`;
    let next = form
      .replace(/<label>Name<\/label><input([^>]*name="name"[^>]*)>/i, `<label for="${prefix}-name">Name</label><input id="${prefix}-name"$1>`)
      .replace(/<label>Email<\/label><input([^>]*name="email"[^>]*)>/i, `<label for="${prefix}-email">Email</label><input id="${prefix}-email"$1>`)
      .replace(/<label>Product Needed<\/label><select([^>]*name="product"[^>]*)>/i, `<label for="${prefix}-product">Product Needed</label><select id="${prefix}-product"$1>`)
      .replace(/<label>Message<\/label><textarea([^>]*name="message"[^>]*)>/i, `<label for="${prefix}-message">Message</label><textarea id="${prefix}-message"$1>`);
    next = next.replace(
      "I agree that HUANGSI may use these details to respond to my quotation request.",
      'I agree to the <a href="/privacy">privacy policy</a> and allow HUANGSI to use these details to respond to my quotation request.',
    );
    if (!next.includes("/privacy")) {
      next = next.replace(
        /(<button class="btn" type="submit">)/i,
        `<label class="form-consent"><input type="checkbox" name="consent" required><span>I agree to the <a href="/privacy">privacy policy</a> and allow HUANGSI to use these details to respond to my inquiry.</span></label>$1`,
      );
    }
    if (!next.includes("data-copy-rfq")) {
      next = next.replace(
        /(<button class="btn" type="submit">[^<]+<\/button>)/i,
        '$1<button class="btn secondary" type="button" data-copy-rfq>Copy RFQ Details</button>',
      );
    }
    return next;
  });
}

function globalUpgrades(html, relativePath) {
  let next = html;
  if (!next.includes('rel="icon"')) {
    next = next.replace(
      /(<link\s+rel="stylesheet"\s+href="\/assets\/css\/styles\.css">)/i,
      '<link rel="icon" href="/favicon.svg" type="image/svg+xml">$1',
    );
  }
  next = next
    .replace(
      /<button class="mobile-toggle"(?:\s+type="button")?(?:\s+aria-label="Open navigation")?[^>]*>☰<\/button>/gi,
      '<button class="mobile-toggle" type="button" aria-label="Open navigation" aria-controls="primary-navigation" aria-expanded="false">☰</button>',
    )
    .replace(
      /<nav class="nav-links"(?![^>]*\bid=)([^>]*)>/gi,
      '<nav class="nav-links" id="primary-navigation"$1>',
    )
    .replaceAll(">Download Catalog<", ">Request Catalog<")
    .replaceAll(">Product Catalog<", ">Request Catalog<");

  if (relativePath === "index.html") {
    next = next
      .replace('<a href="/applications/corporate-office-projects">Space</a>', '<a href="/applications/corporate-office-projects">Spaces</a>')
      .replace('<a href="/blog/how-to-customize-office-furniture-for-corporate-projects">Inspiration</a>', '<a href="/blog/how-to-customize-office-furniture-for-corporate-projects">Buyer Guides</a>')
      .replace('<a href="/quality-control">Sustainability</a>', '<a href="/quality-control">Quality</a>')
      .replace('<a href="/catalog">Resource</a>', '<a href="/catalog">Catalog</a>')
      .replace('<a href="/about">About Us</a>', '<a href="/about">About</a>')
      .replace('<a href="/contact">Showrooms</a>', "")
      .replace('<a href="/contact">Dealer Login</a>', "")
      .replace('<a class="nav-utility-link" href="/contact" aria-label="Search">⌕</a>', "")
      .replace('<a class="nav-utility-link" href="/contact" aria-label="Global">◍</a>', "")
      .replaceAll("Office desk product card 01", "Commercial straight office desk")
      .replaceAll("Office desk product card 02", "Executive office desk with side storage")
      .replaceAll("Office desk product card 03", "Electric height-adjustable office desk")
      .replaceAll("Office desk product card 04", "Modular office workstation desk")
      .replaceAll(">Desk 01<", ">Commercial Office Desk<")
      .replaceAll(">Desk 02<", ">Executive Office Desk<")
      .replaceAll(">Desk 03<", ">Height-Adjustable Desk<")
      .replaceAll(">Desk 04<", ">Modular Workstation<")
      .replaceAll("Office chair product card 01", "Ergonomic mesh task chair")
      .replaceAll("Office chair product card 02", "Commercial office task chair")
      .replaceAll("Office chair product card 03", "High-back mesh office chair")
      .replaceAll("Office chair product card 04", "Multipurpose office chair")
      .replaceAll(">Chair 01<", ">Ergonomic Mesh Chair<")
      .replaceAll(">Chair 02<", ">Commercial Task Chair<")
      .replaceAll(">Chair 03<", ">High-Back Mesh Chair<")
      .replaceAll(">Chair 04<", ">Multipurpose Chair<")
      .replaceAll("Leisure sofa product card 01", "Modular office lounge sofa")
      .replaceAll("Leisure sofa product card 02", "Reception area office sofa")
      .replaceAll("Leisure sofa product card 03", "Collaborative lounge seating")
      .replaceAll("Leisure sofa product card 04", "Commercial waiting area sofa")
      .replaceAll(">Sofa 01<", ">Modular Lounge Sofa<")
      .replaceAll(">Sofa 02<", ">Reception Office Sofa<")
      .replaceAll(">Sofa 03<", ">Collaborative Lounge<")
      .replaceAll(">Sofa 04<", ">Waiting Area Sofa<")
      .replace(
        '<span><a href="/sitemap.xml">Sitemap</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></span>',
        '<span><a href="/sitemap.xml">Sitemap</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></span>',
      );
  } else {
    next = next.replace(
      '<div class="container footer-bottom">© 2026 Foshan Huangsi Furniture Co., Ltd. All rights reserved.</div>',
      '<div class="container footer-bottom"><span>© 2026 Foshan Huangsi Furniture Co., Ltd. All rights reserved.</span><span class="footer-legal"><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/sitemap.xml">Sitemap</a></span></div>',
    );
  }

  next = improveForms(next, relativePath);
  const breadcrumb = breadcrumbSchema(next, relativePath);
  next = addJsonLd(next, breadcrumb, '"BreadcrumbList"');
  if (relativePath === "index.html") {
    next = addJsonLd(
      next,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://huangsifurniture.com/#website",
        url: "https://huangsifurniture.com/",
        name: "HUANGSI",
        alternateName: "HUANGSI Furniture",
        publisher: {
          "@type": "Organization",
          name: "Foshan Huangsi Furniture Co., Ltd.",
          url: "https://huangsifurniture.com/",
        },
        inLanguage: "en",
      },
      '"#website"',
    );
  }
  return next;
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const relativePath = path.relative(root, file).replaceAll(path.sep, "/");
  let html = fs.readFileSync(file, "utf8");

  if (meta[relativePath]) {
    html = updateMetadata(html, ...meta[relativePath]);
  }

  const article = blogs[relativePath];
  if (article) {
    html = updateMetadata(html, article.metaTitle, article.description);
    html = html
      .replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${article.title}</h1>`)
      .replace(
        /<div class="eyebrow">Buyer Guide<\/div><h1>[\s\S]*?<\/h1><p>[\s\S]*?<\/p>/i,
        `<div class="eyebrow">Commercial Buyer Guide</div><h1>${article.title}</h1><p>${article.description}</p>`,
      )
      .replace(/<main class="rich">[\s\S]*?<\/main>/i, `<main class="rich">${renderBlog(article)}</main>`)
      .replace(
        /"dateModified":"[^"]+"/,
        '"dateModified":"2026-07-26"',
      )
      .replace(
        /"headline":"[^"]+"/,
        `"headline":${JSON.stringify(article.title)}`,
      )
      .replace(
        /"description":"[^"]+"/g,
        `"description":${JSON.stringify(article.description)}`,
      );
    html = addJsonLd(html, faqSchema(article), '"FAQPage"');
  }

  if (relativePath === "catalog.html") {
    html = html
      .replace(
        /<div class="eyebrow">Manufacturer Information<\/div><h1>[\s\S]*?<\/h1><p>[\s\S]*?<\/p>/i,
        '<div class="eyebrow">Product Selection Resource</div><h1>Office Furniture Catalog &amp; Product Range</h1><p>Explore the main product categories, then request the current digital catalog that matches your project and destination market.</p>',
      )
      .replace(/<main class="rich">[\s\S]*?<\/main>/i, `<main class="rich">${catalogMain}</main>`);
  }

  if (authorityPageMains[relativePath]) {
    html = html.replace(
      /<main class="rich">[\s\S]*?<\/main>/i,
      `<main class="rich">${authorityPageMains[relativePath]}</main>`,
    );
  }

  html = globalUpgrades(html, relativePath);
  fs.writeFileSync(file, html);
}

const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
if (!sitemap.includes("https://huangsifurniture.com/privacy")) {
  sitemap = sitemap.replace(
    "</urlset>",
    "<url><loc>https://huangsifurniture.com/privacy</loc><lastmod>2026-07-26</lastmod></url>\n<url><loc>https://huangsifurniture.com/terms</loc><lastmod>2026-07-26</lastmod></url>\n</urlset>",
  );
}
fs.writeFileSync(sitemapPath, sitemap);

console.log(`Applied content and site-quality upgrades to ${htmlFiles.length} HTML files.`);
