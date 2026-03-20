/** Real UoM building metadata — researched from university website, library pages, architecture databases. */
export interface BuildingMeta {
  description: string
  tips: string[]
  nearbyFood: string[]
  capacityNote: string
}

export const BUILDING_META: Record<string, BuildingMeta> = {
  'baillieu-library': {
    description: 'The largest library on campus, supporting arts, humanities and social sciences. Spans six levels — one of the most iconic buildings on campus.',
    tips: ['Ground floor has 290+ study spaces with bookable computers and study booths with after-hours access.', 'Level 1 has a graduate study room with 24 power-enabled desks.'],
    nearbyFood: ['Professors Walk Cafe (beside entrance)', 'ST. ALi at Arts & Cultural Building'],
    capacityNote: '~500+ seats across 5 public levels',
  },
  'erc-library': {
    description: 'Student Learning Centre housing physical sciences, maths, engineering and East Asian collections. Recently refurbished as part of the New Student Precinct.',
    tips: ['After-hours study zone covers Basement, Ground, and Level 1 — accessible with student card.', 'Level 3 Graduate Student lounge with swipe access for postgrads.'],
    nearbyFood: ['Student Pavilion food court (adjacent)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Multiple levels with carrels, collaborative areas, Chill Out pods',
  },
  'arts-west': {
    description: '$66M purpose-built facility for the Faculty of Arts with 24 teaching spaces, a digital studio, and gallery displaying university cultural collections.',
    tips: ['Breakout spaces on every level have comfortable seating with device charging.', 'Two Object-Based Learning labs with real artefacts from 23 cultural collections.'],
    nearbyFood: ['Professors Walk Cafe (adjacent)', 'University Cafe on Lygon St (2 min)'],
    capacityNote: '150-seat lecture theatre plus specialist rooms',
  },
  'engineering-1': {
    description: 'Part of the Melbourne School of Engineering precinct, housing lecture theatres, laboratories, and tutorial rooms for engineering disciplines.',
    tips: ['Check ERC Library next door for quieter study options.', 'Ground-floor common areas have power outlets and are less crowded than libraries.'],
    nearbyFood: ['PappaRich at Doug McDonell (2 min)', 'Campus Canteen at 201 Grattan St'],
    capacityNote: 'Multiple lecture theatres and tutorial rooms',
  },
  'ict-building': {
    description: 'Home of the School of Computing and Information Systems since 2012. Houses computing labs, teaching spaces, and the CIS Heritage Collection on levels 7-8.',
    tips: ['PappaRich food court on ground floor — one of the best-value meals on campus.', 'Upper levels (7-8) are quieter with heritage computing displays.'],
    nearbyFood: ['PappaRich (ground floor — Mon-Fri 10am-6pm)', 'Gong Cha at Student Pavilion'],
    capacityNote: 'Multiple computer labs and tutorial rooms across 8+ levels',
  },
  'law-school': {
    description: '12-storey landmark on Pelham Street, home to Melbourne Law School. Features a moot courtroom and Woodward Conference Centre on the top floor.',
    tips: ['Law Library spans levels 3-5 with 2,800+ laptop power outlets throughout.', 'Level 3 Law Students Study Area requires swipe card — quieter than main floors.'],
    nearbyFood: ['Amicus Espresso (ground floor)', 'Lygon Street restaurants (3 min)'],
    capacityNote: '3-level law library, lecture theatres, moot courtroom',
  },
  'fbe-building': {
    description: 'Home to Faculty of Business & Economics at 111 Barry Street. Houses Giblin Eunson Library, tutorial rooms, lecture theatres, and student computing spaces.',
    tips: ['Giblin Eunson Library has extended hours (7am-1am with card) and 16 bookable project rooms.', 'Swipe card access to FBE spaces is automatic based on enrolment.'],
    nearbyFood: ['Cafe in Giblin Eunson Library (ground floor)', 'The Spot cafes next door'],
    capacityNote: '16 bookable project rooms plus 18-machine computing lab',
  },
  'the-spot': {
    description: '5 Star Green Star certified teaching centre for Business & Economics. Known for its spotty facade and 46% lower energy use than comparable buildings.',
    tips: ['Student lounges on Levels 1, 2, 3, and 6 — try higher floors for quieter spots.', 'Excellent natural lighting throughout.'],
    nearbyFood: ['Haymarket Place Cafe on Berkeley St (adjacent)', 'Lygon Street dining (3 min)'],
    capacityNote: '25,851 sqm with student lounges on 4 levels',
  },
  'melbourne-school-of-design': {
    description: 'Award-winning 6 Star Green Star building by John Wardle Architects, home to Architecture, Building and Planning. A "built pedagogy" learning building opened in 2014.',
    tips: ['Brian Lewis Atrium on Level 1 — stunning space for informal study and group work.', 'Japanese Room and Design Gallery worth exploring between classes.'],
    nearbyFood: ['Standing Room (ground floor — specialty coffee)', 'Professors Walk Cafe (short walk)'],
    capacityNote: 'Basement lecture theatres, design studios, Brian Lewis Atrium',
  },
  'kwong-lee-dow': {
    description: 'Multipurpose learning environment for the Graduate School of Education. Highly flexible spaces that reconfigure from exam halls to intimate classrooms.',
    tips: ['Level 1 has comfy couches and study nooks around the perimeter.', 'Smart reconfigurable furniture and variable lighting for distraction-free study.'],
    nearbyFood: ['Cafe Commercio on Leicester St (adjacent)', 'Queensberry Street cafes (1-2 min)'],
    capacityNote: 'Seven 42-person configurable rooms or 300 exam seats',
  },
  'old-arts': {
    description: 'Heritage-listed Tudor-Gothic building from 1924 with the iconic castellated clock tower. The last stone building on campus. Houses Faculty of Arts departments.',
    tips: ['Heritage architecture makes it one of the most atmospheric study spots on campus.', 'Located in the historic heart next to Old Quadrangle and South Lawn.'],
    nearbyFood: ['Professors Walk Cafe (1 min)', 'ST. ALi at Arts & Cultural Building (2 min)'],
    capacityNote: 'Tutorial rooms and offices — limited open study space',
  },
  'redmond-barry': {
    description: 'Multi-level building on Tin Alley housing Psychological Sciences (levels 6-12) and Biosciences (levels 2-5). Part of Medicine, Dentistry and Health Sciences.',
    tips: ['Rivett Theatre on lower levels is used for lectures — arrive early.', 'Wheelchair access via northern or eastern entrances.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (next door)', 'Professors Walk Cafe (2 min)'],
    capacityNote: '12 levels with Rivett Theatre and computer labs',
  },
  'john-medley': {
    description: 'Twin-tower building (East and West connected by walkways) that serves as a gateway to the Parkville campus. Houses social science departments and PhD study spaces.',
    tips: ['Level 1 East Tower has a dedicated PhD study space (E161 SCC).', 'Linkway meeting rooms between towers on upper levels for impromptu study.'],
    nearbyFood: ['Cafe Commercio (nearby on Leicester St)', 'Grattan Street food outlets (2 min)'],
    capacityNote: 'Study spaces and meeting rooms across both towers',
  },
  'chemistry-building': {
    description: 'Heritage-listed 1938 Gothic-style building on Masson Road, home to Australia\'s oldest and largest School of Chemistry. Designed by Percy Everett.',
    tips: ['Masson Theatre is a heritage lecture theatre — one of the most characterful spaces on campus.', 'Room numbering can be confusing across levels — check carefully.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (2 min)', 'Professors Walk Cafe (3 min)'],
    capacityNote: 'Masson Theatre, teaching labs, and research labs',
  },
  'peter-hall': {
    description: 'Home to the School of Mathematics and Statistics. Named in 2016 to honour Professor Peter Hall, a world-leading statistician who produced influential work here.',
    tips: ['Upper levels are quieter — used mainly by research staff and PhD students.', 'Tutorial rooms have whiteboards useful for group study.'],
    nearbyFood: ['Campus Canteen at 201 Grattan St (2 min)', 'Student Pavilion food court (3 min)'],
    capacityNote: 'Tutorial rooms, computer labs, and offices',
  },
  'alan-gilbert': {
    description: 'Modern building at 100 Grattan Street for medicine and health science students. Features flexible teaching spaces with Skyfold ceiling-hung folding walls.',
    tips: ['Student Study Space (G26) has USB and power outlets at most seats.', 'Two bookable meeting rooms on Level 2 (capacity 20 each).'],
    nearbyFood: ['Gilbert at Grattan (ground floor cafe)', 'Haymarket Place Cafe on Berkeley St (1 min)'],
    capacityNote: 'Ground floor study space, flexible seminar rooms, meeting rooms',
  },
  'student-pavilion': {
    description: 'Purpose-built 27,000 sqft student hub completed 2023 as part of the $225K sqft New Student Precinct. Designed as an informal "home on campus" with gold balconies.',
    tips: ['Level 4 has best city views on campus and a bookable student kitchen.', 'Recreation library has fiction, graphic novels, magazines, and a game room.'],
    nearbyFood: ["Ho Ho's Xpress, Moonfishh, Gong Cha (inside)", 'Journeys Cafe (inside — ASRC social enterprise, most items under $10)'],
    capacityNote: 'Multiple levels of dining, study, arts, meeting spaces',
  },
  'david-caro': {
    description: 'Home of the School of Physics on the corner of Tin Alley and Swanston Street. Named after David Edmund Caro, former Vice-Chancellor. Contains the Hercus and Laby lecture theatres.',
    tips: ['Physics South Block adjacent has additional tutorial rooms.', 'Ground-level common areas near theatres can be used between lectures.'],
    nearbyFood: ['Standing Room at Glyn Davis Building (1 min)', 'Professors Walk Cafe (3 min)'],
    capacityNote: 'Hercus and Laby theatres, tutorial rooms, physics labs',
  },
}
