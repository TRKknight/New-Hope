
import { useState, useMemo } from "react";

const CAT_COLORS = {
  Laws: "#185FA5", Equations: "#3B6D11", Effects: "#534AB7",
  Reflexes: "#0F6E56", Syndromes: "#993C1D", "Tests & Signs": "#854F0B",
  "Bodies & Cells": "#72243E", Breathing: "#3C3489", Theories: "#5F5E5A",
  Anatomy: "#0F6E56",
};

const DATA = [
  // LAWS
  { cat: "Laws", name: "Starling / Frank-Starling Law", def: "Force of cardiac contraction is directly proportional to the initial length (end-diastolic volume) of the muscle fiber." },
  { cat: "Laws", name: "Poiseuille's Law", def: "Rate of blood flow ∝ ΔP·r⁴ / (8ηL). Flow increases dramatically with vessel radius." },
  { cat: "Laws", name: "Ohm's Law", def: "Blood flow = ΔPressure / Resistance. Hemodynamic analogue of electrical Ohm's Law." },
  { cat: "Laws", name: "Law of Laplace", def: "Wall tension in a sphere: T = P·r / 2. Explains why small alveoli tend to collapse into large ones." },
  { cat: "Laws", name: "Landsteiner's Law", def: "In ABO system, if an agglutinogen is present on the RBC, the corresponding agglutinin is absent from plasma." },
  { cat: "Laws", name: "Bell-Magendie Law", def: "Dorsal spinal roots are sensory; ventral roots are motor. Established the anatomical basis of reflex arcs." },
  { cat: "Laws", name: "Einthoven's Law", def: "In ECG bipolar limb leads: Lead II = Lead I + Lead III. Defines the Einthoven triangle." },
  { cat: "Laws", name: "Fick's Law of Diffusion", def: "Net gas diffusion rate ∝ (surface area × ΔP) / membrane thickness. Basis of lung diffusion capacity." },
  { cat: "Laws", name: "Boyle's Law", def: "At constant temperature, gas volume is inversely proportional to pressure (PV = constant)." },
  { cat: "Laws", name: "Charles' Law", def: "At constant pressure, gas volume is directly proportional to absolute temperature." },
  { cat: "Laws", name: "Dalton's Law", def: "Total pressure of a gas mixture = sum of partial pressures of each individual gas." },
  { cat: "Laws", name: "Henry's Law", def: "Amount of gas dissolved in liquid ∝ its partial pressure above the liquid." },
  { cat: "Laws", name: "Graham's Law", def: "Rate of gas diffusion ∝ 1/√molecular weight. CO₂ diffuses faster than O₂." },
  { cat: "Laws", name: "Avogadro's Law", def: "Equal volumes of any gas at same temperature and pressure contain equal numbers of molecules." },
  { cat: "Laws", name: "All-or-None Law", def: "A tissue either responds maximally to a threshold stimulus or does not respond at all. Applies to cardiac muscle and individual nerve fibers." },
  { cat: "Laws", name: "Law of the Intestine", def: "Bolus of food causes contraction orad (behind) and relaxation aborad (ahead) — basis of peristalsis." },
  { cat: "Laws", name: "Weber-Fechner Law", def: "Perceived sensation ∝ log(stimulus intensity). Explains why we hear in decibels." },
  { cat: "Laws", name: "Power Law (Stevens)", def: "Relates actual stimulus strength to perceived signal strength by a power function (ψ = k·φⁿ)." },
  { cat: "Laws", name: "Law of Projection", def: "Stimulation of a sensory pathway at any point causes sensation to be referred to the original receptor location." },
  { cat: "Laws", name: "Marey's Law", def: "Heart rate is inversely proportional to blood pressure (baroreceptor basis)." },
  { cat: "Laws", name: "Monro-Kellie Doctrine", def: "Total volume in the rigid cranium (brain + blood + CSF) is constant; increase in one must be offset by decrease in another." },
  { cat: "Laws", name: "Bernoulli Principle", def: "As fluid velocity increases, its lateral pressure decreases. Explains murmurs, Venturi effect, and airway dynamics." },
  { cat: "Laws", name: "Ideal Gas Law", def: "PV = nRT. Approximates gas behaviour in respiratory physiology under varying pressures and temperatures." },
  { cat: "Laws", name: "Law of Forward Conduction", def: "At a chemical synapse, impulses travel only from presynaptic to postsynaptic neuron — enforces one-directional signalling." },
  // EQUATIONS
  { cat: "Equations", name: "Nernst Equation", def: "Calculates equilibrium potential for a single ion: E = (RT/zF) × ln([X]o/[X]i)." },
  { cat: "Equations", name: "Goldman-Hodgkin-Katz (GHK)", def: "Calculates resting membrane potential when multiple ions (Na⁺, K⁺, Cl⁻) and their permeabilities are considered." },
  { cat: "Equations", name: "Henderson-Hasselbalch", def: "pH = pKa + log([HCO₃⁻] / 0.03×PaCO₂). Used to interpret acid-base status." },
  { cat: "Equations", name: "Bohr's Equation", def: "Estimates physiological dead space: Vd/Vt = (PaCO₂ − PeCO₂) / PaCO₂." },
  { cat: "Equations", name: "Bazett's Formula", def: "Corrects QT interval for heart rate: QTc = QT / √RR. Normal QTc < 440 ms." },
  { cat: "Equations", name: "Radford's Formula", def: "Predicts anatomical dead space (mL) ≈ 2.2 × body weight (lbs)." },
  { cat: "Equations", name: "Dubois Formula", def: "Calculates body surface area (m²) from height and weight; used to derive cardiac index." },
  { cat: "Equations", name: "Fick Principle", def: "Cardiac output = O₂ consumption / (arterial O₂ − venous O₂). Gold-standard method for measuring cardiac output." },
  { cat: "Equations", name: "Poiseuille-Hagen Formula", def: "Resistance = 8ηL / πr⁴. Relates viscosity, tube length, and radius to flow resistance." },
  { cat: "Equations", name: "Erlanger-Gasser Classification", def: "Classifies nerve fibers by diameter and conduction velocity: Aα > Aβ > Aγ > Aδ > B > C." },
  // EFFECTS
  { cat: "Effects", name: "Bohr Effect", def: "↑H⁺ or ↑CO₂ shifts O₂-Hb dissociation curve right → lower O₂ affinity → easier O₂ unloading in tissues." },
  { cat: "Effects", name: "Haldane Effect", def: "Oxygenation of Hb in lungs displaces CO₂, doubling CO₂ release. Complement of the Bohr effect." },
  { cat: "Effects", name: "Hamburger Shift (Chloride Shift)", def: "In tissues, HCO₃⁻ exits RBC in exchange for Cl⁻ to maintain electrical neutrality." },
  { cat: "Effects", name: "Gibbs-Donnan Effect", def: "Asymmetric ion distribution across a membrane caused by the presence of nondiffusible charged proteins on one side." },
  { cat: "Effects", name: "Treppe (Staircase)", def: "Progressive increase in contraction force during rapid, repeated stimulation of a previously resting muscle." },
  { cat: "Effects", name: "Bowditch Phenomenon", def: "Increased heart rate → increased force of contraction (positive force-frequency relationship)." },
  { cat: "Effects", name: "Fenn Effect", def: "Muscle uses extra energy proportional to the external work it performs." },
  { cat: "Effects", name: "Post-Extrasystolic Potentiation", def: "The beat after a compensatory pause (following an ectopic beat) is stronger than normal due to increased Ca²⁺ loading." },
  { cat: "Effects", name: "Post-Tetanic Potentiation", def: "Twitch amplitude is increased immediately after a tetanic contraction ends." },
  { cat: "Effects", name: "Anrep Effect", def: "Acute ↑ afterload → compensatory ↑ myocardial contractility. Intrinsic cardiac autoregulation." },
  { cat: "Effects", name: "Wolff-Chaikoff Effect", def: "Very high iodide dose acutely inhibits thyroid hormone synthesis (organification block)." },
  { cat: "Effects", name: "Jod-Basedow Phenomenon", def: "Excess iodine administration triggers hyperthyroidism in a susceptible thyroid gland." },
  { cat: "Effects", name: "Aldosterone Escape", def: "After 3-5 days of excess aldosterone, kidneys escape Na⁺ retention via ANP and pressure natriuresis." },
  { cat: "Effects", name: "Purkinje Shift", def: "In dim light the eye shifts maximum sensitivity from ~555 nm (photopic) to ~505 nm (scotopic)." },
  { cat: "Effects", name: "Lewis-Hunting Response", def: "Rhythmic vasoconstriction then vasodilation during sustained cold exposure — protects against frostbite." },
  { cat: "Effects", name: "Latch-Bridge Mechanism", def: "Smooth muscle cross-bridges lock in a low-energy state, sustaining tension without continued ATP hydrolysis." },
  { cat: "Effects", name: "Clasp-Knife Phenomenon", def: "Sudden collapse of resistance when a spastic limb is passively stretched (Golgi tendon organ activation)." },
  { cat: "Effects", name: "Windkessel Effect", def: "Large elastic arteries buffer pulsatile flow from the heart into a more continuous peripheral flow." },
  { cat: "Effects", name: "Alpha Block (Arousal Response)", def: "Disappearance of alpha rhythm (8-13 Hz) on EEG upon eye opening or mental effort; replaced by desynchronised beta waves." },
  { cat: "Effects", name: "Déjà Vu", def: "Inappropriate sense of familiarity with a new situation; associated with temporal lobe activity." },
  { cat: "Effects", name: "Dale's Phenomenon", def: "Neurotransmitters are released in quanta (discrete packets/vesicles), not a continuous stream." },
  { cat: "Effects", name: "Renshaw Inhibition", def: "Motor neurons activate Renshaw cells (inhibitory interneurons) that feed back to inhibit the same motor neurons." },
  { cat: "Effects", name: "P Factor (Lewis Factor)", def: "Chemical substance (likely K⁺) that accumulates in ischemic muscle and stimulates nociceptors — responsible for anginal pain." },
  { cat: "Effects", name: "Place Principle", def: "Different frequencies stimulate specific tonotopic locations along the basilar membrane, enabling pitch discrimination." },
  { cat: "Effects", name: "Volley Principle", def: "Groups of auditory nerve fibres fire in volleys to encode high-frequency sound information beyond the limit of a single fibre." },
  { cat: "Effects", name: "Mittelschmerz", def: "Brief lower abdominal pain at mid-cycle ovulation caused by minor peritoneal irritation from follicular fluid release." },
  { cat: "Effects", name: "Dumping Syndrome", def: "Post-gastrectomy rapid gastric emptying → osmotic fluid shift into gut → weakness, sweating, palpitations after meals." },
  { cat: "Effects", name: "Occlusion", def: "When inputs to a neuronal pool overlap, combined response is less than the arithmetic sum of individual responses." },
  { cat: "Effects", name: "Subliminal Fringe (Summation)", def: "Inputs that individually fail to reach threshold can summate to produce a supramaximal combined response." },
  // REFLEXES
  { cat: "Reflexes", name: "Bainbridge Reflex", def: "Atrial wall stretch (↑venous return) → ↑heart rate via vagal inhibition and sympathetic activation." },
  { cat: "Reflexes", name: "Bezold-Jarisch Reflex", def: "Chemical stimulation of ventricular receptors → bradycardia, hypotension, apnea. Also called coronary chemoreflex." },
  { cat: "Reflexes", name: "Hering-Breuer Reflex", def: "Lung inflation activates pulmonary stretch receptors → inhibits further inspiration (inflation reflex)." },
  { cat: "Reflexes", name: "Head's Paradoxical Reflex", def: "Strong lung inflation paradoxically stimulates further inspiratory effort (opposite of Hering-Breuer)." },
  { cat: "Reflexes", name: "Cushing's Reflex", def: "↑Intracranial pressure → intense systemic hypertension (+ bradycardia = Cushing's triad)." },
  { cat: "Reflexes", name: "J (Juxtacapillary) Reflex", def: "Pulmonary congestion stimulates J receptors → rapid shallow breathing (dyspnea)." },
  { cat: "Reflexes", name: "Axon Reflex", def: "Antidromic conduction in sensory C fibers after skin injury releases substance P → local arteriolar dilation (flare)." },
  { cat: "Reflexes", name: "Enterogastric Reflex", def: "Duodenal distension or fat/acid → inhibits gastric motility and secretion." },
  { cat: "Reflexes", name: "Gastrocolic Reflex", def: "Stomach distension after a meal → ↑colonic motility (explains postprandial urge to defecate)." },
  { cat: "Reflexes", name: "Micturition Reflex", def: "Bladder stretch receptors → parasympathetic detrusor contraction + urethral sphincter relaxation." },
  { cat: "Reflexes", name: "Mass Reflex", def: "After severe spinal cord injury, a minor stimulus below the lesion triggers widespread flexor spasms + bowel/bladder evacuation." },
  { cat: "Reflexes", name: "Vestibulo-Ocular Reflex", def: "Head rotation → compensatory eye movement in the opposite direction to stabilise retinal image." },
  { cat: "Reflexes", name: "Accommodation Reflex", def: "Near vision: lens thickens (ciliary muscle contracts), pupils constrict, eyes converge." },
  { cat: "Reflexes", name: "Pupillary Light Reflex", def: "Light → optic nerve → pretectal nucleus → bilateral Edinger-Westphal → pupil constriction." },
  { cat: "Reflexes", name: "Consensual Light Reflex", def: "Light in one eye → constriction of the OPPOSITE pupil (bilateral efferent limb of light reflex)." },
  { cat: "Reflexes", name: "Tympanic (Acoustic) Reflex", def: "Loud sound → contraction of stapedius and tensor tympani → stiffens ossicular chain, protects cochlea." },
  { cat: "Reflexes", name: "Phillipson's / Crossed Extensor Reflex", def: "Noxious stimulus to one limb → flexion of that limb + extension of the contralateral limb." },
  { cat: "Reflexes", name: "Peristaltic (Myenteric) Reflex", def: "Contraction orad + relaxation aborad to a gut bolus — the basis of normal propulsion." },
  // SYNDROMES
  { cat: "Syndromes", name: "Brown-Séquard Syndrome", def: "Spinal cord hemisection: ipsilateral motor loss + fine touch/proprioception loss; contralateral pain/temperature loss." },
  { cat: "Syndromes", name: "Horner's Syndrome", def: "Sympathetic chain damage: ptosis, miosis, anhidrosis (enophthalmos) on the ipsilateral side." },
  { cat: "Syndromes", name: "Klüver-Bucy Syndrome", def: "Bilateral amygdala damage: hyperorality, hypersexuality, visual agnosia, fearlessness, and placidity." },
  { cat: "Syndromes", name: "WPW Syndrome", def: "Bundle of Kent bypasses AV node → short PR, delta wave, wide QRS, risk of re-entrant tachycardia." },
  { cat: "Syndromes", name: "LGL Syndrome", def: "Pre-excitation via James fibers: short PR interval but NORMAL QRS (unlike WPW)." },
  { cat: "Syndromes", name: "Wenckebach (Mobitz I)", def: "Progressive PR prolongation until a QRS is dropped, then cycle repeats. AV nodal block." },
  { cat: "Syndromes", name: "Stokes-Adams Syndrome", def: "Sudden loss of consciousness due to transient complete heart block → cardiac asystole." },
  { cat: "Syndromes", name: "Sick Sinus Syndrome", def: "SA node dysfunction → inappropriate bradycardia, sinus arrest, tachy-brady syndrome." },
  { cat: "Syndromes", name: "Long QT Syndrome", def: "Delayed ventricular repolarisation (KVLQT1 mutation etc.) → risk of torsades de pointes and sudden death." },
  { cat: "Syndromes", name: "Zollinger-Ellison Syndrome", def: "Gastrinoma (often in pancreas/duodenum) → massive gastrin excess → peptic ulceration + diarrhea." },
  { cat: "Syndromes", name: "Bartter Syndrome", def: "Loss-of-function mutation in thick ascending loop transporters → hypokalemia, metabolic alkalosis, high renin/aldosterone, normotension." },
  { cat: "Syndromes", name: "Gitelman Syndrome", def: "Like Bartter but affects DCT thiazide-sensitive transporter → also hypomagnesemia + hypocalciuria." },
  { cat: "Syndromes", name: "Liddle's Syndrome", def: "Gain-of-function ENaC mutation → looks like hyperaldosteronism but renin and aldosterone are LOW." },
  { cat: "Syndromes", name: "Gordon Syndrome", def: "Pseudohypoaldosteronism Type II: hyperkalemia + hypertension with normal GFR. Opposite of Bartter." },
  { cat: "Syndromes", name: "Fanconi Syndrome", def: "Generalised proximal tubule dysfunction: glucosuria, aminoaciduria, phosphaturia, bicarbonaturia." },
  { cat: "Syndromes", name: "Hartnup Disease", def: "Defective neutral amino acid transporter in intestine and proximal tubule → pellagra-like rash, ataxia." },
  { cat: "Syndromes", name: "Kallmann Syndrome", def: "GnRH neuron migration failure → hypogonadotropic hypogonadism + anosmia (absent olfactory bulbs)." },
  { cat: "Syndromes", name: "Addison's Disease", def: "Primary adrenal insufficiency: fatigue, hyperpigmentation, hypotension, hyponatremia, hyperkalemia." },
  { cat: "Syndromes", name: "Cushing's Syndrome", def: "Chronic cortisol excess: central obesity, moon face, buffalo hump, striae, hypertension." },
  { cat: "Syndromes", name: "Hashimoto's Disease", def: "Autoimmune thyroiditis: anti-TPO antibodies destroy follicles → hypothyroidism. Most common thyroid disease." },
  { cat: "Syndromes", name: "Ménière's Disease", def: "Endolymphatic hydrops: episodic vertigo + fluctuating sensorineural hearing loss + tinnitus + aural fullness." },
  { cat: "Syndromes", name: "Weber Syndrome", def: "Midbrain lesion at CN III nucleus: ipsilateral CN III palsy + contralateral hemiplegia." },
  { cat: "Syndromes", name: "Millard-Gubler Syndrome", def: "Pons lesion: ipsilateral CN VI & VII palsy + contralateral hemiplegia." },
  { cat: "Syndromes", name: "Avellis Syndrome", def: "Lesion of CN X (vagus) in medulla + contralateral hemiplegia." },
  { cat: "Syndromes", name: "Adiposogenital (Fröhlich) Syndrome", def: "Hypothalamic damage → hypogonadism + obesity. Distinct from simple obesity." },
  { cat: "Syndromes", name: "Lambert-Eaton Syndrome", def: "Autoimmune attack on presynaptic Ca²⁺ channels at NMJ → proximal weakness that IMPROVES with repetition." },
  { cat: "Syndromes", name: "Guillain-Barré Syndrome", def: "Acute immune demyelination of peripheral nerves → ascending flaccid paralysis, areflexia." },
  { cat: "Syndromes", name: "Metabolic Syndrome (Syndrome X)", def: "Cluster: central obesity + insulin resistance + hypertension + dyslipidaemia + hyperglycaemia." },
  { cat: "Syndromes", name: "Zellweger Syndrome", def: "Peroxisome biogenesis disorder: absent peroxisomes → accumulation of very-long-chain fatty acids. Neonatal." },
  { cat: "Syndromes", name: "Hirschsprung's Disease", def: "Congenital absence of myenteric ganglion cells in colon → failure of relaxation → functional obstruction." },
  { cat: "Syndromes", name: "Pendred Syndrome", def: "Defective thyroid organification of iodine + sensorineural deafness (pendrin mutation)." },
  { cat: "Syndromes", name: "Monge's Disease", def: "Chronic Mountain Sickness: polycythaemia, pulmonary hypertension, cor pulmonale in long-term highlanders." },
  { cat: "Syndromes", name: "Stein-Leventhal (PCOS)", def: "Polycystic ovarian syndrome: hyperandrogenism, chronic anovulation, insulin resistance." },
  { cat: "Syndromes", name: "Chiari-Frommel Syndrome", def: "Persistent galactorrhoea + amenorrhoea + uterine atrophy after childbirth (hyperprolactinaemia)." },
  { cat: "Syndromes", name: "Menetrier Disease", def: "Giant rugal folds + protein-losing gastropathy + increased mucus; premalignant." },
  { cat: "Syndromes", name: "Sjögren's Syndrome", def: "Autoimmune exocrinopathy: xerostomia + xerophthalmia. Anti-Ro (SS-A) and Anti-La (SS-B) antibodies." },
  { cat: "Syndromes", name: "Raynaud's Disease", def: "Episodic digital vasospasm in response to cold/stress → white → blue → red colour changes." },
  { cat: "Syndromes", name: "Buerger's Disease", def: "Thromboangiitis obliterans: inflammatory arterial occlusion in young male smokers → claudication, gangrene." },
  { cat: "Syndromes", name: "Huntington's Disease", def: "CAG repeat expansion in huntingtin gene → progressive chorea, dementia, psychiatric symptoms." },
  { cat: "Syndromes", name: "Tetralogy of Fallot", def: "Four defects: VSD + pulmonary stenosis + overriding aorta + RVH → right-to-left shunt → cyanotic 'blue baby'." },
  { cat: "Syndromes", name: "Barrett's Oesophagus", def: "Intestinal metaplasia of oesophageal squamous epithelium due to chronic GORD; premalignant." },
  { cat: "Syndromes", name: "Ebstein's Anomaly", def: "Apical displacement of tricuspid valve leaflets → atrialized RV → intermittent cyanosis + arrhythmias." },
  { cat: "Syndromes", name: "Duchenne / Becker Muscular Dystrophy", def: "X-linked dystrophin gene mutations → progressive muscle degeneration. Duchenne = absent dystrophin; Becker = reduced." },
  { cat: "Syndromes", name: "Whipple's Disease", def: "Tropheryma whipplei infection → malabsorption, diarrhea, arthralgias, PAS-positive macrophages in lamina propria." },
  { cat: "Syndromes", name: "Refsum Disease", def: "Phytanic acid oxidase deficiency (peroxisomal) → accumulation of phytanic acid → neuropathy, retinitis, ataxia." },
  // TESTS & SIGNS
  { cat: "Tests & Signs", name: "Argyll Robertson Pupil", def: "Accommodation present but light reflex absent. Seen in neurosyphilis. Mnemonic: ARP (Accommodation Reflex Present) / PRA (Pupillary Reflex Absent)." },
  { cat: "Tests & Signs", name: "Adie Tonic Pupil", def: "Ciliary ganglion lesion: dilated pupil with very slow (tonic) response to light and accommodation." },
  { cat: "Tests & Signs", name: "Romberg Sign", def: "Loss of balance when standing with feet together and eyes closed → posterior column/proprioception lesion." },
  { cat: "Tests & Signs", name: "Babinski Sign", def: "Extension (dorsiflexion) of big toe on plantar stimulation → upper motor neuron lesion." },
  { cat: "Tests & Signs", name: "Chvostek's Sign", def: "Tapping facial nerve at parotid → ipsilateral facial muscle twitch; indicates hypocalcaemia." },
  { cat: "Tests & Signs", name: "Trousseau's Sign", def: "Carpal spasm with BP cuff inflated above systolic for 3 minutes; indicates hypocalcaemia." },
  { cat: "Tests & Signs", name: "Corrigan's Pulse", def: "Water-hammer (collapsing) pulse of aortic regurgitation — rapid upstroke and sudden collapse." },
  { cat: "Tests & Signs", name: "Cannon Wave", def: "Giant 'a' wave in JVP when right atrium contracts against closed tricuspid valve (complete heart block)." },
  { cat: "Tests & Signs", name: "Charcot's Triad (cerebellar)", def: "Nystagmus + intention tremor + scanning speech — classic triad of cerebellar disease (e.g., MS)." },
  { cat: "Tests & Signs", name: "Myerson's Sign", def: "Inability to suppress blink to repeated glabellar taps — seen in Parkinson's disease." },
  { cat: "Tests & Signs", name: "Queckenstedt Test", def: "During LP, compress jugular veins → CSF pressure should rise rapidly; failure suggests spinal subarachnoid block." },
  { cat: "Tests & Signs", name: "Schilling Test", def: "Two-stage test: oral radioactive B₁₂ ± intrinsic factor to identify cause of B₁₂ malabsorption." },
  { cat: "Tests & Signs", name: "Hollander (Insulin) Test", def: "Insulin-induced hypoglycaemia stimulates vagus → measures gastric acid output (tests vagotomy completeness)." },
  { cat: "Tests & Signs", name: "Jendrassik's Maneuver", def: "Patient hooks fingers and pulls apart → reinforces patellar/ankle reflexes by reducing cortical inhibition." },
  { cat: "Tests & Signs", name: "Rinne's Test", def: "Tuning fork: AC > BC = normal or sensorineural; BC > AC = conductive deafness." },
  { cat: "Tests & Signs", name: "Weber's Test", def: "Tuning fork on vertex: lateralises to BETTER ear in sensorineural, WORSE ear in conductive deafness." },
  { cat: "Tests & Signs", name: "Ishihara Charts", def: "Pseudoisochromatic plates using coloured dots to screen for red-green colour blindness." },
  { cat: "Tests & Signs", name: "Spinnbarkeit Test", def: "Measures the elasticity/stretchability of cervical mucus — peaks at ovulation due to oestrogen effect." },
  { cat: "Tests & Signs", name: "Van den Bergh Test", def: "Differentiates conjugated (direct) from unconjugated (indirect) bilirubin in serum." },
  { cat: "Tests & Signs", name: "Barany's Chair", def: "Rotating chair used to test semicircular canal function by inducing nystagmus." },
  { cat: "Tests & Signs", name: "Bjerrum Screen", def: "Tangent screen used to map the central visual field and detect scotomas." },
  { cat: "Tests & Signs", name: "Auer Bodies", def: "Abnormal azurophilic primary granules in myeloid blasts — pathognomonic of AML." },
  { cat: "Tests & Signs", name: "Howell-Jolly Bodies", def: "Nuclear remnants in RBCs — seen post-splenectomy, in haemolytic anaemia, megaloblastic anaemia." },
  { cat: "Tests & Signs", name: "Arneth Count", def: "Classification of neutrophils by number of nuclear lobes; left shift (fewer lobes) = immature cells; right shift = hypersegmentation." },
  { cat: "Tests & Signs", name: "Barr Body", def: "Condensed inactive X chromosome visible in female cell nuclei; number = (X chromosomes − 1)." },
  { cat: "Tests & Signs", name: "Snellen's Chart", def: "Standardised chart of letters at distance to measure visual acuity (6/6 or 20/20 is normal)." },
  { cat: "Tests & Signs", name: "Jaeger's Chart", def: "Near-vision chart (J1–J7) used to assess reading vision and presbyopia." },
  { cat: "Tests & Signs", name: "Caloric Test", def: "Ice water irrigation of ear canal → tests oculovestibular reflex; absent response indicates brainstem death." },
  { cat: "Tests & Signs", name: "Doll's Eyes Response", def: "Passive head rotation → eyes should move opposite (brainstem intact); absent = brainstem lesion." },
  // BODIES & CELLS
  { cat: "Bodies & Cells", name: "Herring Bodies", def: "Axonal dilations in the posterior pituitary containing neurosecretory granules (ADH and oxytocin)." },
  { cat: "Bodies & Cells", name: "Kupffer Cells", def: "Resident macrophages lining hepatic sinusoids — phagocytose bacteria and old RBCs." },
  { cat: "Bodies & Cells", name: "Purkinje Fibers", def: "Fastest conducting cells of the cardiac conduction system (2-4 m/s); also large inhibitory neurons in cerebellar cortex." },
  { cat: "Bodies & Cells", name: "Renshaw Cells", def: "Inhibitory glycinergic interneurons in spinal cord ventral horn — provide recurrent inhibition to motor neurons." },
  { cat: "Bodies & Cells", name: "Node of Ranvier", def: "Unmyelinated gap between Schwann cell segments on a myelinated axon — site of saltatory conduction." },
  { cat: "Bodies & Cells", name: "Tamm-Horsfall Protein", def: "Glycoprotein synthesised by thick ascending limb cells; most abundant urinary protein, forms urinary casts." },
  { cat: "Bodies & Cells", name: "C-Peptide", def: "By-product of proinsulin cleavage; equimolar with insulin; marker of endogenous insulin secretion." },
  { cat: "Bodies & Cells", name: "K-Complexes", def: "High-amplitude negative-positive EEG waves in NREM Stage 2 sleep; also triggered by external stimuli." },
  { cat: "Bodies & Cells", name: "Sleep Spindles", def: "Bursts of 12-14 Hz oscillations in NREM Stage 2 generated by thalamic reticular nucleus." },
  { cat: "Bodies & Cells", name: "Spaces of Disse", def: "Perisinusoidal spaces between hepatocytes and sinusoidal endothelium — allow exchange of proteins and lipoproteins." },
  { cat: "Bodies & Cells", name: "Brunner's Glands", def: "Submucosal glands in the duodenum secreting alkaline mucus to neutralise gastric acid entering the duodenum." },
  { cat: "Bodies & Cells", name: "Pre-Bötzinger Complex", def: "Pacemaker neuron cluster in the ventral medulla acting as the central pattern generator for respiratory rhythm." },
  // ANATOMY
  { cat: "Anatomy", name: "Papez Circuit", def: "Neural loop: hippocampus → mammillary bodies → anterior thalamus → cingulate cortex → entorhinal cortex → hippocampus. Critical for memory and emotion." },
  // BREATHING
  { cat: "Breathing", name: "Kussmaul Breathing", def: "Deep, rapid, laboured breathing; compensatory hyperventilation in metabolic acidosis (e.g., DKA)." },
  { cat: "Breathing", name: "Cheyne-Stokes Breathing", def: "Waxing-and-waning tidal volume with periodic apnea; seen in heart failure, high altitude, brainstem compression." },
  { cat: "Breathing", name: "Biot's Respiration", def: "Clusters of breaths then unpredictable apnea; caused by dorsal medullary lesions or raised ICP." },
  { cat: "Breathing", name: "Ondine's Curse", def: "Loss of automatic respiratory drive (medullary pacemaker lesion) requiring voluntary control to breathe." },
  { cat: "Breathing", name: "Apneustic Breathing", def: "Prolonged inspiratory gasps with brief expiration; caused by lesion of the pneumotaxic centre in the pons." },
  // THEORIES
  { cat: "Theories", name: "Young-Helmholtz Theory", def: "Trichromatic colour vision based on three cone types: L (red), M (green), S (blue). Colour blindness = missing one cone type." },
  { cat: "Theories", name: "Sliding-Filament Theory", def: "Muscle contraction occurs by thin actin filaments sliding over thick myosin filaments — sarcomere shortens but filaments do not." },
  { cat: "Theories", name: "Walk-Along (Ratchet) Theory", def: "Myosin cross-bridges attach, pull (powerstroke), detach, and reattach further along actin in a cyclical ratchet." },
  { cat: "Theories", name: "Traveling Wave Hypothesis", def: "Sound sets up a wave along the basilar membrane; each frequency peaks at a specific location (tonotopy)." },
  { cat: "Theories", name: "Milieu Intérieur", def: "Claude Bernard's concept: the internal fluid environment must remain constant for cells to function optimally." },
  { cat: "Theories", name: "Hayflick Limit", def: "Normal human somatic cells can divide ~50-70 times before entering senescence due to telomere shortening." },
];

const CATS = ["All", ...Object.keys(CAT_COLORS)];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [mode, setMode] = useState("browse");
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  // quiz state
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [done, setDone] = useState(false);

  const filtered = useMemo(() => DATA.filter(d => {
    const catOk = activeCat === "All" || d.cat === activeCat;
    const q = search.toLowerCase();
    const searchOk = !q || d.name.toLowerCase().includes(q) || d.def.toLowerCase().includes(q);
    return catOk && searchOk;
  }), [activeCat, search]);

  function startQuiz() {
    const d = shuffle(filtered);
    setDeck(d); setIdx(0); setFlipped(false); setCorrect(0); setWrong(0); setDone(false);
  }

  function handleModeChange(m) {
    setMode(m);
    if (m === "quiz") {
      const d = shuffle(filtered);
      setDeck(d); setIdx(0); setFlipped(false); setCorrect(0); setWrong(0); setDone(false);
    }
  }

  function flip() { if (!flipped) setFlipped(true); }

  function mark(wasCorrect) {
    if (wasCorrect) setCorrect(c => c + 1); else setWrong(w => w + 1);
    const next = idx + 1;
    if (next >= deck.length) { setDone(true); } else { setIdx(next); setFlipped(false); }
  }

  function skip() {
    const next = idx + 1;
    if (next >= deck.length) { setDone(true); } else { setIdx(next); setFlipped(false); }
  }

  const card = deck[idx];
  const pct = deck.length ? Math.round((idx / deck.length) * 100) : 0;
  const scorePct = (correct + wrong) ? Math.round((correct / (correct + wrong)) * 100) : 0;

  const s = {
    wrap: { fontFamily: "var(--font-sans)", padding: "1rem 0" },
    searchRow: { display: "flex", gap: 8, marginBottom: 12 },
    input: { flex: 1, padding: "8px 12px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 14, outline: "none" },
    modeBtns: { display: "flex", gap: 6 },
    modeBtn: (active) => ({ padding: "7px 14px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: active ? "var(--color-background-tertiary)" : "var(--color-background-primary)", color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: active ? 500 : 400, fontSize: 13, cursor: "pointer" }),
    cats: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1rem" },
    catBtn: (active) => ({ padding: "5px 11px", border: `0.5px solid ${active ? "var(--color-border-primary)" : "var(--color-border-tertiary)"}`, borderRadius: 20, background: active ? "var(--color-background-secondary)" : "var(--color-background-primary)", color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)", fontWeight: active ? 500 : 400, fontSize: 12, cursor: "pointer" }),
    count: { fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 12 },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: 10 },
    card: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: 14, cursor: "pointer" },
    cardCat: { fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", marginBottom: 6 },
    cardName: { fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 6, lineHeight: 1.3 },
    cardDef: { fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" },
    dot: (cat) => ({ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: CAT_COLORS[cat] || "#888", marginRight: 5, verticalAlign: "middle" }),
    // quiz
    quizWrap: { maxWidth: 520, margin: "0 auto", textAlign: "center" },
    quizMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", fontSize: 13, color: "var(--color-text-secondary)" },
    progressWrap: { height: 3, background: "var(--color-background-secondary)", borderRadius: 2, marginBottom: "1.5rem" },
    progressBar: (w) => ({ height: "100%", borderRadius: 2, background: "#1D9E75", width: w + "%", transition: "width 0.3s" }),
    flashcard: { minHeight: 220, background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-xl)", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", marginBottom: "1rem" },
    fcSide: { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-tertiary)", position: "absolute", top: 14, left: 14 },
    fcCat: (cat) => ({ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: CAT_COLORS[cat] || "#888", position: "absolute", top: 14, right: 14 }),
    fcTerm: { fontSize: 20, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.3 },
    fcDef: { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6 },
    fcHint: { fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 12 },
    quizBtns: { display: "flex", gap: 10, justifyContent: "center", marginBottom: "1rem" },
    gotIt: { padding: "9px 20px", border: "0.5px solid #0F6E56", borderRadius: "var(--border-radius-md)", fontSize: 13, cursor: "pointer", background: "var(--color-background-primary)", color: "#0F6E56" },
    missed: { padding: "9px 20px", border: "0.5px solid #993C1D", borderRadius: "var(--border-radius-md)", fontSize: 13, cursor: "pointer", background: "var(--color-background-primary)", color: "#993C1D" },
    skipBtn: { padding: "7px 16px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", fontSize: 12, cursor: "pointer", background: "none", color: "var(--color-text-tertiary)" },
    doneBox: { padding: "2rem", textAlign: "center" },
    restartBtn: { padding: "9px 20px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", fontSize: 13, cursor: "pointer", background: "var(--color-background-primary)", color: "var(--color-text-primary)" },
    // modal
    overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" },
    modalBox: { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-xl)", padding: "1.5rem", maxWidth: 420, width: "90%", position: "relative" },
    modalClose: { position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "var(--color-text-tertiary)", fontSize: 18 },
    modalCat: { fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-tertiary)", marginBottom: 6 },
    modalName: { fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 12, lineHeight: 1.3 },
    modalDef: { fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 12 },
  };

  return (
    <div style={s.wrap}>
      {/* top controls */}
      <div style={s.searchRow}>
        <input style={s.input} placeholder="Search names, definitions…" value={search} onChange={e => setSearch(e.target.value)} />
        <div style={s.modeBtns}>
          <button style={s.modeBtn(mode === "browse")} onClick={() => handleModeChange("browse")}>Browse</button>
          <button style={s.modeBtn(mode === "quiz")} onClick={() => handleModeChange("quiz")}>Quiz</button>
        </div>
      </div>
      <div style={s.cats}>
        {CATS.filter(c => c === "All" || DATA.some(d => d.cat === c)).map(c => (
          <button key={c} style={s.catBtn(c === activeCat)} onClick={() => setActiveCat(c)}>
            {c === "All" ? `All (${DATA.length})` : c}
          </button>
        ))}
      </div>

      {/* BROWSE */}
      {mode === "browse" && (
        <>
          <div style={s.count}>{filtered.length} {filtered.length === 1 ? "entry" : "entries"}</div>
          <div style={s.grid}>
            {filtered.map((d, i) => (
              <div key={i} style={s.card} onClick={() => setModal(d)}>
                <div style={s.cardCat}><span style={s.dot(d.cat)} />{d.cat}</div>
                <div style={s.cardName}>{d.name}</div>
                <div style={s.cardDef}>{d.def}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* QUIZ */}
      {mode === "quiz" && (
        <div style={s.quizWrap}>
          {!done && card ? (
            <>
              <div style={s.quizMeta}>
                <span style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>{idx + 1} / {deck.length}</span>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontWeight: 500, color: "#0F6E56" }}>{correct} ✓</span>
                  <span style={{ fontWeight: 500, color: "#993C1D" }}>{wrong} ✗</span>
                </div>
              </div>
              <div style={s.progressWrap}><div style={s.progressBar(pct)} /></div>
              <div style={s.flashcard} onClick={flip}>
                <span style={s.fcSide}>{flipped ? "Definition" : "Term"}</span>
                <span style={s.fcCat(card.cat)}>{card.cat}</span>
                {!flipped ? (
                  <>
                    <div style={s.fcTerm}>{card.name}</div>
                    <div style={s.fcHint}>Tap to reveal definition</div>
                  </>
                ) : (
                  <div style={s.fcDef}>{card.def}</div>
                )}
              </div>
              {flipped && (
                <div style={s.quizBtns}>
                  <button style={s.gotIt} onClick={() => mark(true)}>✓ Got it</button>
                  <button style={s.missed} onClick={() => mark(false)}>✗ Missed</button>
                </div>
              )}
              <button style={s.skipBtn} onClick={skip}>Skip →</button>
            </>
          ) : done ? (
            <div style={s.doneBox}>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>
                {scorePct >= 80 ? "Excellent work!" : scorePct >= 50 ? "Good effort!" : "Keep practising!"}
              </div>
              <div style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
                {correct} correct, {wrong} missed ({scorePct}%)
              </div>
              <button style={s.restartBtn} onClick={startQuiz}>Restart quiz ↺</button>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: "var(--color-text-secondary)", paddingTop: "2rem" }}>No entries match your current filter.</div>
          )}
        </div>
      )}

      {/* MODAL */}
      {modal && (
        <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
          <div style={s.modalBox}>
            <button style={s.modalClose} onClick={() => setModal(null)}>✕</button>
            <div style={s.modalCat}><span style={s.dot(modal.cat)} />{modal.cat}</div>
            <div style={s.modalName}>{modal.name}</div>
            <div style={s.modalDef}>{modal.def}</div>
          </div>
        </div>
      )}
    </div>
  );
}
