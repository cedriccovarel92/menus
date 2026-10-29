/* ---------- Dates ---------- */
const JOURS=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const BASE_WEEK='2026-10-12';
const pad=n=>String(n).padStart(2,'0');
const iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parseISO=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)};
const addDays=(s,n)=>{const d=parseISO(s);d.setDate(d.getDate()+n);return iso(d)};
const mondayOf=s=>{const d=parseISO(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return iso(d)};
const dayIdx=s=>(parseISO(s).getDay()+6)%7;
const TODAY=iso(new Date());
const fmtDay=s=>{const d=parseISO(s);return `${d.getDate()} ${MOIS[d.getMonth()]}`};
const fmtLong=s=>`${JOURS[dayIdx(s)]} ${fmtDay(s)}`;
function weekLabel(mon){const sun=addDays(mon,6),a=parseISO(mon),b=parseISO(sun);
  return a.getMonth()===b.getMonth()?`du ${a.getDate()} au ${b.getDate()} ${MOIS[b.getMonth()]}`:`du ${fmtDay(mon)} au ${fmtDay(sun)}`}
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Recettes de la semaine de base ---------- */
// B : portion de Johan [nom, grammes, catégorie] — total 200 g. Étape commençant par ★ = prélèvement de la portion bébé.
const R=[
{d:0,s:'midi',t:'Cabillaud, purée de panais & pommes de terre',b:'Cabillaud émietté + purée panais/pomme de terre',k:'plate',tm:'35 min',
 A:['320 g de cabillaud (2 dos + 20 g pour Johan)','490 g de panais (dont 90 g pour Johan)','480 g de pommes de terre (dont 80 g pour Johan)','20 cl de lait','25 g de beurre','1 citron, persil, sel, poivre'],
 B:[['Panais',90,'leg'],['Pomme de terre',80,'fec'],['Cabillaud',20,'pro'],['Lait',5,'lait'],['Beurre',5,'gras']],
 S:["Éplucher panais et pommes de terre, couper en cubes. Cuire 20 min à la vapeur ou à l'eau non salée.",
    "Cuire le cabillaud 8 min à la vapeur, au-dessus des légumes.",
    "★ Prélever 90 g de panais, 80 g de pommes de terre et 20 g de cabillaud. Écraser les légumes avec 5 g de beurre et un filet de lait. Émietter le poisson en passant les doigts sur chaque bouchée pour sentir les arêtes.",
    "Pour les adultes : écraser le reste des légumes avec le lait chaud et le beurre, saler, poivrer, ajouter persil et un trait de citron.",
    "Dresser le cabillaud sur la purée."],
 T:["Aucune arête : on émiette à la main, jamais au mixeur sans vérifier.","Purée lisse ou écrasée à la fourchette selon ce qu'il mâche déjà.","Pas de sel ni de citron dans son assiette."]},
{d:0,s:'soir',t:'Soupe de courge butternut, œuf mollet & mouillettes',b:'Velouté de butternut + œuf dur écrasé',k:'bowl',tm:'40 min',
 A:['820 g de butternut épluchée (dont 120 g pour Johan)','150 g de pommes de terre (dont 50 g pour Johan)','1 oignon','3 œufs : 2 mollets, 1 dur à partager','4 tranches de pain de campagne','10 cl de crème','Huile d\'olive, sel, poivre, muscade'],
 B:[['Butternut',120,'leg'],['Pomme de terre',50,'fec'],['Lait',15,'lait'],['Œuf dur',12,'pro'],['Huile de colza',3,'gras']],
 S:["Faire suer l'oignon émincé dans un peu d'huile 5 min. Ajouter butternut et pommes de terre en cubes, couvrir d'eau non salée, cuire 25 min.",
    "Cuire 1 œuf 10 min (dur) et 2 œufs 6 min (mollets), puis les plonger dans l'eau froide.",
    "★ Prélever 120 g de butternut et 50 g de pomme de terre avec un peu de bouillon, mixer avec 15 g de lait et 3 g d'huile de colza. Écraser ¼ d'œuf dur (12 g) à la fourchette, à mélanger au velouté ou à servir à côté.",
    "Pour les adultes : mixer le reste avec la crème, saler, poivrer, râper un peu de muscade.",
    "Griller le pain, le couper en mouillettes et servir avec les œufs mollets écalés."],
 T:["Œuf cuit dur pour Johan : blanc et jaune bien pris.","Le soir, ¼ d'œuf suffit à 13 mois : il a eu son poisson à midi.","Tester la température du velouté sur l'intérieur du poignet."]},
{d:1,s:'midi',t:'Risotto crémeux au potimarron & champignons',b:'Risotto très fondant au potimarron',k:'plate',tm:'40 min',
 A:['185 g de riz arborio (dont 25 g pour Johan)','500 g de potimarron (dont 100 g pour Johan)','250 g de champignons de Paris','1 oignon','1 l de bouillon de légumes maison, sans sel','40 g de comté râpé (dont 10 g pour Johan)','25 g de beurre, sel, poivre'],
 B:[['Potimarron',100,'leg'],['Riz arborio cuit',80,'fec'],['Comté râpé',10,'lait'],['Lait',5,'lait'],['Beurre',5,'gras']],
 S:["Couper le potimarron en dés (la peau se mange une fois bien cuite). Cuire 100 g à la vapeur 15 min pour Johan.",
    "Faire revenir l'oignon dans le beurre, ajouter le riz et le nacrer 2 min.",
    "Verser le bouillon louche par louche pendant 18 à 20 min en ajoutant le reste du potimarron.",
    "★ Prélever 80 g de riz : il doit être plus cuit que le vôtre, prolonger 5 min avec un peu d'eau si besoin. Mélanger avec le potimarron vapeur écrasé, 10 g de comté, 5 g de beurre et un filet de lait.",
    "Pour les adultes : dorer les champignons émincés à la poêle, les ajouter au risotto avec le comté, saler et poivrer."],
 T:["Repas sans viande ni poisson : ce soir, l'omelette de Johan passe à ½ œuf.","Riz fondant et collant, aucun grain dur.","Bouillon maison sans cube : les cubes sont trop salés pour un bébé."]},
{d:1,s:'soir',t:'Omelette aux poireaux fondants & salade',b:'Omelette bien cuite hachée + fondue de poireaux',k:'plate',tm:'25 min',
 A:['5 œufs (dont ½ pour Johan)','400 g de poireaux (dont 90 g pour Johan)','1 pomme de terre de 85 g (pour Johan)','1 salade verte et une vinaigrette','20 g de beurre, ciboulette, sel, poivre'],
 B:[['Poireaux',90,'leg'],['Pomme de terre',80,'fec'],['Omelette',25,'pro'],['Beurre',5,'gras']],
 S:["Émincer finement les poireaux (blanc et vert tendre), bien les laver. Les faire fondre 15 min à couvert dans le beurre avec 3 c. à soupe d'eau, sans coloration.",
    "Cuire la pomme de terre 15 min à l'eau.",
    "★ Prélever 90 g de poireaux avant de saler. Battre ½ œuf, le cuire seul dans une petite poêle, le retourner et cuire jusqu'à ce qu'il ne reste aucune partie baveuse. Hacher, servir avec les poireaux et la pomme de terre écrasée.",
    "Pour les adultes : battre les œufs restants, saler, poivrer, verser sur les poireaux et cuire à feu doux.",
    "Servir avec la salade et la ciboulette."],
 T:["Pas d'œuf baveux pour les jeunes enfants : omelette prise à cœur.","Poireaux coupés très fins puis hachés, leurs fibres peuvent le faire tousser.","½ œuf ce soir pour compenser le midi sans viande."]},
{d:2,s:'midi',t:'Escalope de dinde, carottes & patates douces au four',b:'Dinde hachée + bâtonnets de carotte & patate douce ultra-tendres',k:'plate',tm:'45 min',
 A:['2 escalopes de dinde (300 g) + 20 g pour Johan','485 g de carottes (dont 85 g pour Johan)','440 g de patates douces (dont 90 g pour Johan)','2 c. à soupe d\'huile d\'olive','Herbes de Provence, sel, poivre'],
 B:[['Patate douce',90,'fec'],['Carottes',85,'leg'],['Dinde',20,'pro'],["Huile d'olive",5,'gras']],
 S:["Préchauffer le four à 200 °C. Couper carottes et patates douces en bâtonnets de la taille d'un doigt.",
    "★ Réserver 85 g de carottes et 90 g de patate douce : 15 min à la vapeur, puis 10 min au four sur une plaque à part avec 5 g d'huile, sans sel ni herbes. Ils doivent s'écraser entre deux doigts.",
    "Pour les adultes : mélanger le reste avec l'huile, les herbes, sel et poivre, enfourner 35 min.",
    "Cuire les escalopes 4 min par face. Couper 20 g, vérifier que le cœur est blanc, hacher finement pour Johan.",
    "Saler, poivrer les escalopes des adultes et servir avec les légumes rôtis."],
 T:["Bâtonnets en DME : longs comme un doigt pour qu'il les tienne, fondants.","Dinde hachée, jamais en dés fermes.","La pré-cuisson vapeur évite une croûte trop dure au four."]},
{d:2,s:'soir',t:'Tarte rustique épinards & chèvre',b:'Épinards hachés + purée de patate douce + chèvre frais',k:'tart',tm:'50 min',
 A:['1 pâte brisée','300 g d\'épinards frais (dont 60 g pour Johan)','120 g de bûche de chèvre','2 œufs, 15 cl de crème','120 g de patate douce (pour Johan)','1 gousse d\'ail, muscade, sel, poivre'],
 B:[['Patate douce',120,'fec'],['Épinards',60,'leg'],['Chèvre frais',15,'lait'],['Beurre',5,'gras']],
 S:["Préchauffer le four à 180 °C. Laver les épinards, les faire tomber 3 min à la poêle.",
    "Cuire 120 g de patate douce 15 min à la vapeur.",
    "★ Prélever 60 g d'épinards avant l'ail et le sel, les presser et les hacher très finement. Écraser la patate douce avec 5 g de beurre, ajouter 15 g de chèvre frais au lait pasteurisé.",
    "Pour les adultes : ajouter l'ail aux épinards, étaler sur la pâte, verser les œufs battus avec la crème, la muscade, le sel et le poivre, puis déposer le chèvre en rondelles.",
    "Cuire 30 à 35 min, jusqu'à ce que la tarte soit dorée."],
 T:["Fromage au lait pasteurisé : pas de lait cru avant 5 ans, sauf pâtes pressées cuites comme le comté.","Épinards servis le jour même, sans réchauffer une seconde fois.","Pas de pâte pour Johan : sèche et salée."]},
{d:3,s:'midi',t:'Saumon, fondue de poireaux & riz complet',b:'Saumon émietté + poireaux fondants + riz bien cuit',k:'plate',tm:'40 min',
 A:['2 pavés de saumon (260 g) + 20 g pour Johan','380 g de poireaux (dont 80 g pour Johan)','140 g de riz complet (dont 20 g pour Johan)','10 cl de crème, 15 g de beurre','Aneth, citron, sel, poivre'],
 B:[['Riz complet cuit',90,'fec'],['Poireaux',80,'leg'],['Saumon',20,'pro'],['Lait',5,'lait'],['Beurre',5,'gras']],
 S:["Cuire le riz complet 35 à 40 min dans un grand volume d'eau ; prolonger de 5 à 10 min la part de Johan.",
    "Faire fondre les poireaux émincés dans le beurre 15 min à couvert.",
    "Cuire le saumon 10 min à la vapeur ou au four à 180 °C.",
    "★ Prélever 80 g de poireaux sans sel ni crème, 90 g de riz très cuit écrasé avec un filet de lait et 5 g de beurre, 20 g de saumon sans peau émietté.",
    "Pour les adultes : ajouter crème, aneth, sel et poivre aux poireaux, servir avec le saumon et le citron."],
 T:["Retirer la peau et chercher les arêtes du bout des doigts.","Le riz complet reste ferme : trop cuit, il est parfait pour lui.","Poisson deux fois par semaine dont un gras comme le saumon : c'est le bon rythme."]},
{d:3,s:'soir',t:'Gratin de coquillettes au potimarron & comté',b:'Coquillettes très cuites + purée de potimarron + comté râpé',k:'plate',tm:'35 min',
 A:['225 g de coquillettes (dont 25 g pour Johan)','500 g de potimarron (dont 100 g pour Johan)','90 g de comté râpé (dont 10 g pour Johan)','15 cl de crème, 10 cl de lait','Muscade, sel, poivre'],
 B:[['Potimarron',100,'leg'],['Coquillettes cuites',80,'fec'],['Comté râpé',10,'lait'],['Lait',10,'lait']],
 S:["Cuire le potimarron en dés 15 min à la vapeur. Préchauffer le four à 200 °C.",
    "Cuire les coquillettes : 8 min pour les adultes, 3 à 4 min de plus pour celles de Johan.",
    "★ Écraser 100 g de potimarron avec 10 g de lait, mélanger avec 80 g de coquillettes très cuites et 10 g de comté. Sa portion ne passe pas au four : le dessus gratiné serait dur.",
    "Pour les adultes : mixer le reste du potimarron avec crème, lait, muscade, sel et poivre, mélanger aux pâtes, couvrir de comté et gratiner 15 min."],
 T:["Le comté est une pâte pressée cuite : autorisé.","Couper les coquillettes en deux s'il avale sans mâcher.","Pas de viande ce soir : le comté et la viande du midi suffisent."]},
{d:4,s:'midi',t:'Sauté de dinde au cidre, poireaux & champignons',b:'Effiloché de dinde + poireaux & champignons bien fondants',k:'plate',tm:'45 min',
 A:['350 g de sauté de dinde (dont 20 g pour Johan)','300 g de poireaux (dont 50 g pour Johan)','290 g de champignons (dont 40 g pour Johan)','485 g de pommes de terre (dont 85 g pour Johan)','20 cl de cidre brut, 10 cl de crème','1 c. à soupe d\'huile, thym, sel, poivre'],
 B:[['Pomme de terre',85,'fec'],['Poireaux',50,'leg'],['Champignons',40,'leg'],['Dinde',20,'pro'],['Beurre',5,'gras']],
 S:["Cuire les pommes de terre 20 min à la vapeur.",
    "Dorer la dinde dans l'huile 5 min, ajouter poireaux et champignons émincés, 5 min de plus.",
    "Ajouter 10 cl d'eau, couvrir et laisser mijoter 15 min.",
    "★ Prélever maintenant, avant le cidre et le sel : 20 g de dinde à effilocher, 50 g de poireaux et 40 g de champignons à hacher. Écraser 85 g de pomme de terre avec 5 g de beurre.",
    "Pour les adultes : verser le cidre, réduire 10 min, ajouter la crème, saler et poivrer."],
 T:["L'alcool du cidre ne s'évapore jamais entièrement : sa portion est retirée avant.","Champignons bien cuits et hachés fin.","La dinde doit se défaire à la fourchette."]},
{d:4,s:'soir',t:'Quiche aux champignons & salade',b:'Flan de champignons léger sans pâte',k:'tart',tm:'50 min',
 A:['1 pâte brisée','360 g de champignons (dont 60 g pour Johan)','4 œufs (dont ¼ pour Johan)','20 cl de crème, 20 cl de lait (dont 40 g pour Johan)','40 g de comté râpé','1 pomme de terre de 85 g (pour Johan)','1 salade verte, muscade, sel, poivre'],
 B:[['Pomme de terre',85,'fec'],['Champignons',60,'leg'],['Lait',40,'lait'],['Œuf',12,'pro'],['Beurre',3,'gras']],
 S:["Préchauffer le four à 180 °C. Faire revenir les champignons émincés 8 min, d'abord à sec puis avec un peu de beurre. Cuire la pomme de terre à la vapeur.",
    "★ Hacher 60 g de champignons, mélanger avec ¼ d'œuf battu (12 g) et 40 g de lait, verser dans un ramequin beurré. Cuire 20 à 25 min au bain-marie : la lame ressort sèche. Servir avec la pomme de terre écrasée.",
    "Pour les adultes : battre le reste des œufs avec crème, lait, comté, muscade, sel et poivre, ajouter les champignons et verser sur la pâte.",
    "Cuire 35 min et servir avec la salade."],
 T:["Flan pris à cœur : couteau sec au centre.","Le reste de l'œuf entamé part dans la quiche.","Sans pâte : moins de sel et une texture à la cuillère."]},
{d:5,s:'midi',t:'Steaks hachés, haricots verts & pommes grenailles',b:'Steak haché bien cuit + haricots verts coupés + grenailles au four',k:'plate',tm:'35 min',
 A:['3 steaks hachés 5 % (2 adultes, 20 g pour Johan, le reste congelé cru le jour de l\'achat)','370 g de haricots verts (dont 80 g pour Johan)','590 g de grenailles (dont 95 g pour Johan)','Huile d\'olive, ail, persil, sel, poivre'],
 B:[['Grenailles',95,'fec'],['Haricots verts',80,'leg'],['Steak haché',20,'pro'],["Huile d'olive",5,'gras']],
 S:["Préchauffer le four à 200 °C. Couper les grenailles en deux, les rôtir 30 min avec un peu d'huile.",
    "Cuire les haricots verts 12 à 15 min à l'eau, 5 min de plus pour ceux de Johan.",
    "Cuire les steaks à la poêle.",
    "★ 20 g de steak cuit à cœur, sans trace rosée, émietté ; 80 g de haricots en tronçons de 1 cm ou écrasés ; 95 g de grenailles sans la peau trop grillée, écrasées ou en quartiers fondants ; 5 g d'huile.",
    "Pour les adultes : ail, persil, sel et poivre sur les grenailles et les haricots."],
 T:["Viande hachée toujours cuite à cœur pour un enfant.","Jamais de grenaille entière : la forme ronde présente un risque d'étouffement.","Haricots très tendres et sans fils."]},
{d:5,s:'soir',t:'Croque-monsieur butternut, jambon & comté',b:'Dés de jambon + purée de butternut + pain grillé tendre',k:'toast',tm:'30 min',
 A:['9 tranches de pain de mie (dont 1 pour Johan)','3 tranches de jambon blanc (dont 10 g pour Johan)','400 g de butternut (dont 150 g pour Johan)','85 g de comté râpé (dont 5 g pour Johan)','25 g de beurre, une salade'],
 B:[['Butternut',150,'leg'],['Pain de mie',30,'fec'],['Jambon blanc',10,'pro'],['Comté',5,'lait'],['Beurre',5,'gras']],
 S:["Cuire la butternut en cubes 15 min à la vapeur et l'écraser en purée.",
    "★ Prélever 150 g de purée, ajouter 5 g de beurre et 5 g de comté. Couper 10 g de jambon découenné en tout petits dés. Toaster à peine 1 tranche de pain de mie sans croûte et la couper en mouillettes moelleuses.",
    "Pour les adultes : tartiner 4 tranches de purée, ajouter jambon et comté, refermer et beurrer l'extérieur.",
    "Cuire 4 min par face à la poêle ou 10 min au four à 200 °C."],
 T:["Jambon découenné : il est salé, 10 g suffisent.","Pain juste doré : un croûton dur se mâche mal.","Mouillettes à tremper dans la purée : il mange seul."]},
{d:6,s:'midi',t:'Poulet rôti & purée de potiron',b:'Effiloché de poulet tendre + purée de potiron',k:'plate',tm:'1 h 30',
 A:['1 poulet de 1,3 à 1,5 kg','800 g de potiron épluché (dont 100 g pour Johan)','275 g de pommes de terre (dont 75 g pour Johan)','20 cl de lait, 30 g de beurre','Thym, ail, sel, poivre'],
 B:[['Potiron',100,'leg'],['Pomme de terre',75,'fec'],['Poulet',20,'pro'],['Beurre',5,'gras']],
 S:["Préchauffer le four à 200 °C. Rôtir le poulet 1 h 15 avec thym et ail, sans le saler.",
    "Cuire potiron et pommes de terre en cubes 20 min à la vapeur.",
    "★ Prélever 20 g de blanc sans peau et l'effilocher finement. Écraser 100 g de potiron et 75 g de pomme de terre avec 5 g de beurre.",
    "Pour les adultes : écraser le reste avec le lait chaud et le beurre, saler, poivrer. Saler le poulet à la découpe."],
 T:["Pas de peau grillée, sèche et salée ; vérifier qu'aucun petit os ne reste.","Un peu de jus non salé humidifie l'effiloché.","Les restes de poulet se gardent 48 h au réfrigérateur."]},
{d:6,s:'soir',t:'Soupe de légumes & petites pâtes',b:'Potage doux + petites pâtes très cuites',k:'bowl',tm:'40 min',
 A:['310 g de carottes (dont 60 g pour Johan)','180 g de poireaux (dont 30 g pour Johan)','240 g de pommes de terre (dont 40 g pour Johan)','170 g de panais (dont 20 g pour Johan)','100 g de petites pâtes (dont 20 g pour Johan)','Bouquet garni, sel, poivre, comté râpé pour les adultes'],
 B:[['Carottes',60,'leg'],['Pomme de terre',40,'fec'],['Poireaux',30,'leg'],['Panais',20,'leg'],['Petites pâtes cuites',45,'fec'],['Huile de colza',5,'gras']],
 S:["Éplucher et couper les légumes, les cuire 25 min dans 1,2 l d'eau avec le bouquet garni.",
    "Cuire les petites pâtes à part, 2 à 3 min de plus que l'indication du paquet.",
    "★ Retirer le bouquet garni. Prélever 150 g de légumes avec un peu de bouillon, mixer finement avec 5 g d'huile de colza, ajouter 45 g de pâtes cuites.",
    "Pour les adultes : mixer ou laisser en morceaux, saler, poivrer, ajouter pâtes et comté."],
 T:["Huile crue ajoutée dans l'assiette : bon apport en oméga-3.","Pas de viande ce soir : celle du midi suffit à 13 mois.","Velouté tiède, testé sur le poignet."]}
];
function baseMeal(r){
  const steps=[],date=addDays(BASE_WEEK,r.d);let eb=-1;
  r.S.forEach((s,i)=>{if(s.startsWith('★')){eb=i;steps.push(s.slice(1).trim())}else steps.push(s)});
  return {date,slot:r.s,titre:r.t,bebe:r.b,kind:r.k,temps:r.tm,ingredientsAdultes:r.A,
    portionBebe:r.B.map(([nom,g,cat])=>({nom,g,cat})),etapes:steps,etapeBebe:eb,conseils:r.T,recetteFournie:true,base:true}
}
const BASE={};R.forEach(r=>{const m=baseMeal(r);BASE[`${m.date}_${m.slot}`]=m});

/* ---------- Liste de courses de la semaine de base ---------- */
const RAYONS=['Fruits & Légumes','Boucherie & Poissonnerie','Crémerie & Frais','Épicerie & Pains'];
const BASE_LIST={
'Fruits & Légumes':[
 ['Butternut','1 grosse, ≈ 1,6 kg brut','Soupe lundi, croque samedi · Johan 270 g'],
 ['Potimarron','1 gros, ≈ 1,2 kg','Risotto mardi, gratin jeudi · Johan 200 g'],
 ['Potiron','1 tranche, ≈ 1 kg','Purée dimanche · Johan 100 g'],
 ['Pommes de terre','1,8 kg','6 repas · Johan 500 g'],
 ['Pommes grenailles','600 g','Samedi midi · Johan 95 g'],
 ['Poireaux','1,3 kg (5 à 6)','Mardi, jeudi, vendredi, dimanche · Johan 250 g'],
 ['Champignons de Paris','900 g','Mardi, vendredi · Johan 100 g'],
 ['Carottes','800 g','Mercredi, soupe dimanche · Johan 145 g'],
 ['Panais','700 g','Lundi, soupe dimanche · Johan 110 g'],
 ['Patates douces','600 g','Mercredi midi et soir · Johan 210 g'],
 ['Haricots verts','400 g','Samedi · Johan 80 g'],
 ['Épinards frais','300 g','Mercredi soir · Johan 60 g'],
 ['Salade verte','2','Mardi et vendredi soir'],
 ['Oignons','2',''],['Ail','1 tête',''],['Citron','1',''],
 ['Herbes fraîches','persil, aneth, ciboulette, thym',''],
 ['Fruits de saison','pommes, poires, bananes','Desserts et goûters']],
'Boucherie & Poissonnerie':[
 ['Cabillaud','350 g (2 dos)','Lundi · Johan 20 g'],
 ['Saumon','300 g (2 pavés)','Jeudi · Johan 20 g'],
 ['Escalopes de dinde','350 g','Mercredi · Johan 20 g'],
 ['Sauté de dinde','350 g','Vendredi · Johan 20 g'],
 ['Steaks hachés 5 %','3','Samedi · Johan 20 g, le reste au congélateur'],
 ['Poulet entier','1, de 1,3 à 1,5 kg','Dimanche · Johan 20 g de blanc'],
 ['Jambon blanc découenné','3 tranches','Samedi soir · Johan 10 g']],
'Crémerie & Frais':[
 ['Œufs','15','4 repas · Johan 1 œuf sur la semaine'],
 ['Comté','250 g (bloc ou râpé)','4 repas · Johan 25 g'],
 ['Bûche de chèvre','1, ≈ 120 g','Tarte de mercredi'],
 ['Chèvre frais au lait pasteurisé','1 petit pot','Mercredi · Johan 15 g'],
 ['Crème fraîche ou liquide','80 cl','Adultes uniquement'],
 ['Beurre','1 plaquette de 250 g',''],
 ['Lait','1 l',''],
 ['Yaourts / desserts infantiles','pour la semaine','']],
'Épicerie & Pains':[
 ['Riz arborio','185 g','Johan 25 g cru'],
 ['Riz complet','140 g','Johan 20 g cru'],
 ['Coquillettes','225 g','Johan 25 g cru'],
 ['Petites pâtes (étoiles, alphabet)','100 g','Johan 20 g cru'],
 ['Pain de mie','9 tranches','Croque samedi'],
 ['Pain de campagne','1','Mouillettes lundi'],
 ['Pâte brisée','2','Tarte mercredi, quiche vendredi'],
 ['Cidre brut','1 bouteille (20 cl)','Vendredi, adultes uniquement'],
 ['Huile de colza','','Ajoutée crue dans les purées de Johan'],
 ["Huile d'olive",'',''],
 ['Sel, poivre, muscade','herbes de Provence, bouquet garni','']]
};

/* ---------- Illustrations des assiettes ---------- */
const CATS={leg:['Légumes','--c-leg'],fec:['Féculents','--c-fec'],pro:['Protéines','--c-pro'],lait:['Laitages','--c-lait'],gras:['Matières grasses','--c-gras']};
const FOOD=[[/myrtille|framboise|fruits rouges/,'#5b4a8a','pieces'],[/avoine|flocon/,'#d8c39a','grains'],[/banane/,'#f3df8a','puree'],[/poire/,'#e6dda4','puree'],[/maizena|fecule|farine/,'#f3eee2','grains'],
 [/butternut|courge|potimarron|potiron/,'#e78f37','puree'],[/patate douce/,'#e2793a','sticks'],[/carotte/,'#ee8a2c','sticks'],
 [/panais|celeri|navet/,'#e8d7a8','puree'],[/pomme de terre|grenaille|pdt|puree/,'#f0d283','pieces'],
 [/poireau/,'#b3cd8a','strands'],[/epinard|blette/,'#3f6c39','strands'],[/haricot|brocoli|courgette|petits pois/,'#5f9441','sticks'],
 [/champignon/,'#b59a79','pieces'],[/\briz\b|semoule|quinoa/,'#f4ede0','grains'],[/coquillette|\bpates?\b|vermicelle|nouille/,'#f1d07b','grains'],
 [/pain|mouillette|crouton/,'#d89d57','pieces'],[/saumon|truite/,'#f29874','flakes'],[/cabillaud|poisson|colin|merlu|lieu|dorade/,'#f4eee3','flakes'],
 [/dinde|poulet|volaille|veau/,'#e5c294','flakes'],[/steak|boeuf|viande|hache|porc|agneau/,'#8c4c3a','pieces'],[/jambon/,'#f0ada0','pieces'],
 [/omelette|oeuf/,'#f5cc45','pieces'],[/comte|fromage|gruyere|emmental|parmesan/,'#f3cc62','grains'],
 [/chevre|yaourt|lait|creme|ricotta/,'#faf6ea','puree'],[/beurre|huile/,'#f0d562','drop'],[/lentille|pois chiche/,'#c9783f','grains'],
 [/tomate/,'#d9502f','pieces'],[/pomme|poire|banane|compote/,'#efd9a0','puree']];
function food(name){const n=norm(name);for(const [re,col,tex] of FOOD)if(re.test(n))return {col,tex};return {col:'#cbb38c',tex:'pieces'}}
function catOf(name){const n=norm(name);
  if(/beurre|huile/.test(n))return 'gras';
  if(/comte|fromage|gruyere|emmental|parmesan|chevre|yaourt|lait|creme|ricotta/.test(n))return 'lait';
  if(/cabillaud|poisson|saumon|colin|merlu|lieu|truite|dorade|dinde|poulet|volaille|veau|steak|boeuf|viande|hache|porc|agneau|jambon|oeuf|omelette|lentille|pois chiche/.test(n))return 'pro';
  if(/pomme de terre|grenaille|\briz\b|semoule|quinoa|coquillette|\bpates?\b|vermicelle|pain|mouillette|patate douce|polenta/.test(n))return 'fec';
  return 'leg'}
function mix(hex,t){const h=hex.replace('#','');let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);
  const k=t<0?0:255,a=Math.abs(t);r=Math.round(r+(k-r)*a);g=Math.round(g+(k-g)*a);b=Math.round(b+(k-b)*a);return `rgb(${r},${g},${b})`}
function rng(seed){let s=2166136261;for(const c of seed)s=Math.imul(s^c.charCodeAt(0),16777619)>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
function bit(tex,x,y,col,r,sc){const rot=(r()*180).toFixed(0),d=mix(col,-.22),l=mix(col,.35);
  switch(tex){
   case 'puree':return `<path d="M${x-6*sc} ${y} q${3*sc} ${-5*sc} ${6*sc} 0 t${6*sc} 0" fill="none" stroke="${l}" stroke-width="${1.6*sc}" stroke-linecap="round" transform="rotate(${rot} ${x} ${y})"/>`;
   case 'grains':return `<ellipse cx="${x}" cy="${y}" rx="${3.4*sc}" ry="${1.7*sc}" fill="${l}" stroke="${d}" stroke-width=".5" transform="rotate(${rot} ${x} ${y})"/>`;
   case 'sticks':return `<rect x="${x-7*sc}" y="${y-2.2*sc}" width="${14*sc}" height="${4.4*sc}" rx="${2*sc}" fill="${col}" stroke="${d}" stroke-width=".7" transform="rotate(${rot} ${x} ${y})"/>`;
   case 'strands':return `<path d="M${x-7*sc} ${y+2*sc} q${4*sc} ${-7*sc} ${8*sc} ${-1*sc} t${6*sc} ${-2*sc}" fill="none" stroke="${d}" stroke-width="${2*sc}" stroke-linecap="round" transform="rotate(${rot} ${x} ${y})"/>`;
   case 'flakes':return `<ellipse cx="${x}" cy="${y}" rx="${5.5*sc}" ry="${3.2*sc}" fill="${l}" stroke="${d}" stroke-width=".7" transform="rotate(${rot} ${x} ${y})"/>`;
   case 'drop':return `<circle cx="${x}" cy="${y}" r="${2.6*sc}" fill="${l}" stroke="${d}" stroke-width=".5"/>`;
   default:return `<rect x="${x-3.8*sc}" y="${y-3.8*sc}" width="${7.6*sc}" height="${7.6*sc}" rx="${2*sc}" fill="${d}" transform="rotate(${rot} ${x} ${y})"/><circle cx="${x-1*sc}" cy="${y-1*sc}" r="${1.4*sc}" fill="${l}"/>`}}
const P=(a,r)=>[110+r*Math.cos(a),110+r*Math.sin(a)];
function plateSVG(items,kind,key,big){
  const r=rng(key),total=items.reduce((s,i)=>s+i.g,0)||1;
  const label=items.map(i=>`${i.nom} ${i.g} g`).join(', ');
  let o=`<svg class="${big?'big':''}" viewBox="0 0 220 230" ${big?'':'width="54" height="56"'} role="img" aria-label="Assiette de Johan : ${esc(label)}">`;
  o+=`<ellipse cx="110" cy="214" rx="86" ry="10" fill="var(--plate-shadow)"/>`;
  const dens=big?1:.35;
  if(kind==='bowl'){
    o+=`<circle cx="110" cy="110" r="102" fill="var(--plate-rim)"/><circle cx="110" cy="110" r="92" fill="var(--plate)"/>`;
    const soupItems=items.filter(i=>i.cat==='leg'||(i.cat==='fec'&&food(i.nom).tex!=='grains'));
    const main=(soupItems.length?soupItems:items).slice().sort((a,b)=>b.g-a.g)[0];
    const sc=food(main.nom).col;
    o+=`<circle cx="110" cy="110" r="78" fill="${sc}"/><circle cx="110" cy="110" r="78" fill="none" stroke="${mix(sc,-.15)}" stroke-width="3"/>`;
    for(let i=0;i<Math.round(14*dens)+2;i++){const a=r()*6.283,rr=10+r()*55,[x,y]=P(a,rr);o+=bit('puree',x,y,sc,r,1.3)}
    items.filter(i=>!soupItems.includes(i)).forEach(it=>{const f=food(it.nom),n=Math.max(2,Math.round(it.g/3*dens));
      for(let i=0;i<n;i++){const a=r()*6.283,rr=r()*48,[x,y]=P(a,rr);o+=bit(f.tex,x,y,f.col,r,1)}});
    o+=`<path d="M48 70 A78 78 0 0 1 90 36" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5" stroke-linecap="round"/>`;
  } else {
    o+=`<circle cx="110" cy="110" r="104" fill="var(--plate)" stroke="var(--plate-rim)" stroke-width="2"/><circle cx="110" cy="110" r="86" fill="none" stroke="var(--plate-rim)" stroke-width="1.5"/>`;
    const minA=0.24,gap=0.05,R0=76;
    let angs=items.map(i=>Math.max(minA,i.g/total*6.283));const sum=angs.reduce((a,b)=>a+b,0);angs=angs.map(a=>a/sum*6.283);
    let a0=-Math.PI/2;
    items.forEach((it,idx)=>{const f=food(it.nom),a1=a0+angs[idx],s=a0+gap/2,e=a1-gap/2,[x1,y1]=P(s,R0),[x2,y2]=P(e,R0),large=(e-s)>Math.PI?1:0;
      const [cx0,cy0]=P((s+e)/2,4);
      o+=`<path d="M${cx0} ${cy0} L${x1} ${y1} A${R0} ${R0} 0 ${large} 1 ${x2} ${y2} Z" fill="${f.col}" stroke="${mix(f.col,-.12)}" stroke-width="1" stroke-linejoin="round"/>`;
      const n=Math.max(1,Math.round((e-s)*16*dens));
      for(let i=0;i<n;i++){const aa=s+.08+r()*Math.max(.01,(e-s)-.16),rr=18+r()*(R0-28),[x,y]=P(aa,rr);o+=bit(f.tex,x,y,f.col,r,big?1:1.5)}
      a0=a1});
    o+=`<path d="M40 76 A76 76 0 0 1 78 40" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/>`;
  }
  return o+'</svg>'}
function portionFigure(m){
  const items=portionOf(m),total=items.reduce((s,i)=>s+i.g,0);
  const bycat={};items.forEach(i=>bycat[i.cat]=(bycat[i.cat]||0)+i.g);
  const order=['leg','fec','pro','lait','gras'].filter(c=>bycat[c]);
  return `<figure class="plate">${plateSVG(items,m.kind||'plate',m.date+m.slot,true)}
   <figcaption><div class="eyebrow">Assiette de Johan · ${total} g</div>
   <div class="bar" aria-hidden="true">${order.map(c=>`<span style="width:${bycat[c]/total*100}%;background:var(${CATS[c][1]})"></span>`).join('')}</div>
   <ul class="legend">${items.map(i=>`<li><span class="sw" style="background:${food(i.nom).col}"></span><span class="n">${esc(i.nom)}</span><span class="g">${i.g} g</span></li>`).join('')}</ul>
   <div class="cats">${order.map(c=>`<span><span class="sw" style="background:var(${CATS[c][1]})"></span>${CATS[c][0]} ${bycat[c]} g</span>`).join('')}</div>
   </figcaption></figure>`}
function guessPortion(bebe,slot){
  const parts=String(bebe||'').replace(/\(.*?\)/g,'').split(/\+|,|\bet\b|\bavec\b/).map(s=>s.trim()).filter(s=>s.length>1);
  let items=parts.map(p=>({nom:p.charAt(0).toUpperCase()+p.slice(1),cat:catOf(p),g:0}));
  if(!items.length)items=[{nom:'Légumes',cat:'leg',g:0}];
  const base={pro:slot==='soir'?10:20,fec:80,lait:10,gras:5};
  const counts={};items.forEach(i=>counts[i.cat]=(counts[i.cat]||0)+1);
  items.forEach(i=>{if(i.cat!=='leg')i.g=Math.round(base[i.cat]/counts[i.cat])});
  if(!items.some(i=>i.cat==='gras'))items.push({nom:'Huile de colza',cat:'gras',g:5});
  const used=items.reduce((s,i)=>s+i.g,0),legs=items.filter(i=>i.cat==='leg');
  if(legs.length){const each=Math.floor((200-used)/legs.length);legs.forEach(l=>l.g=each)}
  else{const f=items.find(i=>i.cat==='fec');if(f)f.g+=200-used;else items.unshift({nom:'Légumes',cat:'leg',g:200-used})}
  const diff=200-items.reduce((s,i)=>s+i.g,0);items.sort((a,b)=>b.g-a.g)[0].g+=diff;
  return items}
function portionOf(m){
  if(Array.isArray(m.portionBebe)&&m.portionBebe.length)
    return m.portionBebe.map(p=>({nom:String(p.nom||'?'),g:Math.max(0,Math.round(+p.g||0)),cat:CATS[p.cat]?p.cat:catOf(p.nom)})).filter(p=>p.g>0);
  return guessPortion(m.bebe,m.slot)}

/* ---------- État & stockage ---------- */
const LS='menus-johan-v1';
const state={tab:'calendrier',week:BASE_WEEK,dayFilter:null,imported:{},checks:{},extras:{},foods:{},sweets:{},ratings:{},db:null,files:[],pending:null,busy:false,swap:null,cook:null};
function loadLocal(){try{const v=JSON.parse(localStorage.getItem(LS)||'{}');state.imported=v.meals||{};state.checks=v.checks||{};state.extras=v.extras||{};state.foods=v.foods||{};state.sweets=v.sweets||{};state.ratings=v.ratings||{}}catch(e){}}
function saveLocal(){try{localStorage.setItem(LS,JSON.stringify({meals:state.imported,checks:state.checks,extras:state.extras,foods:state.foods,sweets:state.sweets,ratings:state.ratings}))}catch(e){}}
loadLocal();
const getMeal=(date,slot)=>{const k=`${date}_${slot}`,im=state.imported[k];if(im)return im.empty?null:im;return BASE[k]||null};
const weekHasMeals=mon=>{for(let i=0;i<7;i++)for(const s of ['midi','soir'])if(getMeal(addDays(mon,i),s))return true;return false};
(function initWeek(){const cur=mondayOf(TODAY);state.week=weekHasMeals(cur)?cur:BASE_WEEK})();

const store={user:null,mode:window.FIREBASE_CONFIG?'firebase':'claude',unsubs:[]};
const wq={};
function queued(id,fn){wq[id]=(wq[id]||Promise.resolve()).then(fn).catch(()=>{});return wq[id]}
function ckId(week,k){let h=0;for(const c of k)h=(Math.imul(h,31)+c.charCodeAt(0))|0;return week+'~'+norm(k).replace(/[^a-z0-9_.-]/g,'_').slice(0,60)+'~'+(h>>>0).toString(36)}
function rerender(){const y=window.scrollY,a=document.activeElement&&document.activeElement.id,keep=['xName','xQty','fName'].map(id=>[id,document.getElementById(id)?.value]);
  render();keep.forEach(([id,v])=>{const el=document.getElementById(id);if(el&&v)el.value=v});if(a&&['xName','xQty','fName'].includes(a))document.getElementById(a)?.focus();window.scrollTo(0,y)}
function subscribe(db){
  const u1=db.collection('meals').onSnapshot(snap=>{const m={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.date&&v.slot)m[d.id]=v});state.imported=m;saveLocal();if(state.tab!=='importer'&&!state.editing)rerender()},()=>setSync(false));
  const u2=db.collection('checks').onSnapshot(snap=>{const list=snap.docs.map(d=>({id:d.id,v:d.data()}));
    const c={};list.forEach(({id,v})=>{if(!v)return;
      if(v.items&&!id.includes('~')){c[id]=c[id]||{};Object.keys(v.items).forEach(k=>{if(v.items[k])c[id][k]=true})}
      else if(v.week&&v.k){(c[v.week]=c[v.week]||{})[v.k]=v.by||true}});
    state.checks=c;saveLocal();if(state.tab==='courses')rerender();migrateChecks(db,list)},()=>setSync(false));
  const u3=db.collection('extras').onSnapshot(snap=>{const x={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.week&&v.nom)x[d.id]=v});state.extras=x;saveLocal();if(state.tab==='courses')rerender()},()=>{});
  const u4=db.collection('foods').onSnapshot(snap=>{const x={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.nom)x[d.id]=v});state.foods=x;saveLocal();if((state.tab==='johan'||state.tab==='recettes')&&!state.editing)rerender()},()=>{});
  const u5=db.collection('sweets').onSnapshot(snap=>{const x={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.titre)x[d.id]=v});state.sweets=x;saveLocal();if(state.tab==='sucre'&&!state.editing)rerender();if(state.cook)renderCook()},()=>{});
  const u6=db.collection('ratings').onSnapshot(snap=>{const x={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.titre)x[d.id]=v});state.ratings=x;saveLocal();if(['biblio','recettes','sucre'].includes(state.tab)&&!state.editing&&!state.libPlan)rerender()},()=>{});
  return [u1,u2,u3,u4,u5,u6]}
let migrating=false;
async function migrateChecks(db,list){
  const old=list.filter(x=>!x.id.includes('~')&&x.v&&x.v.items);if(!old.length||migrating)return;migrating=true;
  try{for(const o of old){for(const k of Object.keys(o.v.items)){if(o.v.items[k])await db.collection('checks').doc(ckId(o.id,k)).set({week:o.id,k,on:true,at:new Date().toISOString()})}
    await db.collection('checks').doc(o.id).delete()}}catch(e){}finally{migrating=false}}
async function initDb(){
  if(store.mode==='firebase')return initFirebase(window.FIREBASE_CONFIG);
  try{
    if(!window.claude||!claude.use)return;
    const db=await claude.use('db');if(!db)return;
    state.db=db;setSync(true);store.unsubs=subscribe(db);
  }catch(e){setSync(false)}
}
function setSync(ok,u){const el=document.getElementById('sync');el.classList.toggle('ok',ok);
  const name=u?(u.displayName||u.email||''):'';
  el.innerHTML=`<i></i><span>${ok?(name?'Synchronisé · '+esc(name):'Synchronisé en direct'):(store.mode==='firebase'?'Non connecté':'Enregistré sur cet appareil')}</span>${u?'<button class="btn ghost small" id="logout">Se déconnecter</button>':''}`;
  const lo=document.getElementById('logout');if(lo)lo.onclick=()=>firebase.auth().signOut()}
async function saveMeal(m){const id=`${m.date}_${m.slot}`;state.imported[id]=m;saveLocal();
  if(state.db){try{await queued('m'+id,()=>state.db.collection('meals').doc(id).set(m))}catch(e){toast("Enregistré sur cet appareil seulement : la synchronisation a échoué.")}}}
async function deleteMeal(id){delete state.imported[id];saveLocal();render();
  if(state.db)queued('m'+id,()=>state.db.collection('meals').doc(id).delete())}
function firstName(u){const n=(u&&(u.displayName||u.email))||'';return n.split(/[\s@]/)[0]}
function setCheck(week,k,on){
  state.checks[week]=state.checks[week]||{};
  if(on)state.checks[week][k]=store.user?firstName(store.user):true;else delete state.checks[week][k];
  saveLocal();if(!state.db)return;
  const id=ckId(week,k),data={week,k,on:true,at:new Date().toISOString()};if(store.user)data.by=firstName(store.user);
  queued('c'+id,()=>on?state.db.collection('checks').doc(id).set(data):state.db.collection('checks').doc(id).delete())}

/* ---------- Connexion Google (version GitHub + Firebase) ---------- */
function gateMsg(t){const el=document.getElementById('gateMsg');if(el)el.textContent=t}
function authErr(e){const c=e&&e.code||'';
  if(c==='auth/unauthorized-domain')return "Ce site n'est pas autorisé dans Firebase : ajoutez son adresse dans Authentication → Paramètres → Domaines autorisés.";
  if(c==='auth/operation-not-allowed')return "La connexion Google n'est pas activée dans Firebase : Authentication → Sign-in method → Google → Activer, puis Enregistrer.";
  if(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request')return 'Connexion annulée. Touchez à nouveau le bouton.';
  if(c==='auth/popup-blocked')return 'La fenêtre Google a été bloquée. Essayez « Autre méthode de connexion ».';
  if(c==='auth/network-request-failed')return 'Pas de connexion internet. Vérifiez le réseau puis réessayez.';
  if(c==='auth/invalid-api-key'||c==='auth/api-key-not-valid.-please-pass-a-valid-api-key.')return 'La clé apiKey de firebase-config.js est incorrecte : recopiez-la depuis Firebase.';
  if(c==='auth/web-storage-unsupported')return 'Ce navigateur bloque le stockage nécessaire à la connexion. Ouvrez le site dans Safari ou Chrome, hors navigation privée stricte.';
  return 'La connexion a échoué ('+(c||(e&&e.message)||'erreur inconnue')+').'}
async function initFirebase(cfg){
  const gate=document.getElementById('gate');document.body.classList.add('locked');gate.hidden=false;setSync(false);
  const b='https://www.gstatic.com/firebasejs/10.12.2/';
  try{await loadScript(b+'firebase-app-compat.js');await loadScript(b+'firebase-auth-compat.js');await loadScript(b+'firebase-firestore-compat.js')}
  catch(e){gateMsg('Impossible de charger Firebase. Vérifiez votre connexion puis rechargez la page.');return}
  firebase.initializeApp(cfg);
  const db=firebase.firestore();try{db.settings({ignoreUndefinedProperties:true})}catch(e){}
  db.enablePersistence({synchronizeTabs:true}).catch(()=>{});
  const auth=firebase.auth();
  auth.getRedirectResult().catch(e=>gateMsg(authErr(e)));
  const btn=document.getElementById('gateBtn'),alt=document.getElementById('gateAlt');btn.hidden=false;
  const mkProv=()=>{const pr=new firebase.auth.GoogleAuthProvider();pr.setCustomParameters({prompt:'select_account'});return pr};
  const ua=navigator.userAgent||'';
  if(/FBAN|FBAV|Instagram|Line\/|; wv\)|Snapchat|Messenger|GSA\//.test(ua))gateMsg("Ce navigateur intégré (ouvert depuis une appli) bloque la connexion Google. Ouvrez le site dans Safari ou Chrome : menu ⋯ → « Ouvrir dans le navigateur ».");
  let wait=null;
  btn.onclick=async()=>{gateMsg('Ouverture de la fenêtre Google…');clearTimeout(wait);
    wait=setTimeout(()=>{if(!auth.currentUser){alt.hidden=false;gateMsg("Rien ne s'ouvre ? Autorisez les fenêtres pop-up pour ce site, ou touchez « Autre méthode de connexion ».")}},7000);
    try{await auth.signInWithPopup(mkProv());clearTimeout(wait)}
    catch(e){clearTimeout(wait);console.error('Connexion Google',e);alt.hidden=false;
      if(e.code==='auth/popup-blocked'||e.code==='auth/operation-not-supported-in-this-environment'){gateMsg('Redirection vers Google…');return auth.signInWithRedirect(mkProv())}
      gateMsg(authErr(e))}};
  alt.onclick=()=>{gateMsg('Redirection vers Google…');auth.signInWithRedirect(mkProv()).catch(e=>gateMsg(authErr(e)))};
  auth.onAuthStateChanged(async u=>{
    store.unsubs.forEach(f=>{try{f()}catch(e){}});store.unsubs=[];state.db=null;store.user=null;
    if(!u){document.body.classList.add('locked');gate.hidden=false;setSync(false);return}
    const email=(u.email||'').toLowerCase(),allowed=(window.ALLOWED_EMAILS||[]).map(e=>String(e).toLowerCase().trim()).filter(Boolean);
    if(allowed.length&&!allowed.includes(email)){gateMsg(`Le compte ${u.email} n'est pas sur la liste des accès. Demandez au propriétaire du site de l'ajouter.`);await auth.signOut();return}
    try{await db.collection('meals').limit(1).get()}catch(e){gateMsg(`Le compte ${u.email} n'a pas accès aux données (règles Firestore).`);await auth.signOut();return}
    clearTimeout(wait);store.user=u;state.db=db;document.body.classList.remove('locked');gate.hidden=true;setSync(true,u);store.unsubs=subscribe(db);render()});
}

/* ---------- Plaisir sucré ---------- */
const SWEETS=[
{id:'s-compote',titre:'Compote pomme-poire à la cannelle',type:'Compote',temps:'25 min',rendement:'4 pots de 100 g',kind:'bowl',vis:[['Pomme',55],['Poire',45]],
 ingredientsAdultes:['300 g de pommes douces (Gala ou Golden)','300 g de poires bien mûres','5 cl d\'eau','1 pincée de cannelle (facultatif)'],
 etapes:['Éplucher les fruits, retirer le cœur et les pépins, couper en dés.','Cuire à couvert avec l\'eau, 15 min à feu doux, jusqu\'à ce que tout s\'écrase.','Ajouter la cannelle, puis mixer ou écraser à la fourchette.','Laisser tiédir avant de servir.'],
 conseils:['Des variétés douces suffisent : aucun sucre à ajouter.','Écrasée à la fourchette, elle l\'habitue aux petits morceaux.','48 h au réfrigérateur, 1 mois au congélateur en portions.']},
{id:'s-muffins',titre:'Mini-muffins banane & avoine',type:'Goûter',temps:'30 min',rendement:'12 mini-muffins',kind:'plate',vis:[['Banane',45],['Flocons d\'avoine',30],['Myrtilles',15],['Œuf',10]],
 ingredientsAdultes:['2 bananes très mûres (200 g)','1 œuf','80 g de flocons d\'avoine mixés','40 g de farine','1 c. à café de levure','4 cl de lait','20 g de beurre fondu','40 g de myrtilles (facultatif)'],
 etapes:['Préchauffer le four à 180 °C et beurrer 12 moules à mini-muffins.','Écraser les bananes, puis ajouter l\'œuf, le lait et le beurre fondu.','Incorporer les flocons mixés, la farine et la levure.','Couper les myrtilles en deux et les ajouter.','Remplir les moules aux trois quarts et cuire 15 à 18 min : la pointe d\'un couteau ressort sèche.'],
 conseils:['Myrtilles toujours coupées en deux : entières, leur forme ronde présente un risque d\'étouffement.','Moelleux, parfaits à tenir seul en DME.','3 jours en boîte hermétique, 1 mois au congélateur.']},
{id:'s-pancakes',titre:'Pancakes banane-œuf',type:'Goûter',temps:'15 min',rendement:'8 petits pancakes',kind:'plate',vis:[['Banane',55],['Œuf',30],['Farine',15]],
 ingredientsAdultes:['1 banane bien mûre (100 g)','1 œuf','30 g de farine ou de flocons d\'avoine mixés','2 c. à soupe de lait','1 noisette de beurre pour la poêle'],
 etapes:['Écraser la banane, puis mélanger avec l\'œuf, la farine et le lait.','Chauffer la poêle à feu moyen avec un peu de beurre.','Verser de petites cuillerées de pâte et cuire 2 min par face.','Vérifier que le centre est bien pris, puis couper en lanières.'],
 conseils:['Œuf cuit à cœur : aucun centre coulant.','Servir avec une compote plutôt qu\'un sirop.','Lanières de la largeur d\'un doigt pour qu\'il les attrape.']},
{id:'s-creme',titre:'Crème vanille à la banane',type:'Dessert',temps:'15 min + 2 h au frais',rendement:'4 ramequins',kind:'bowl',vis:[['Lait',75],['Banane',20],['Maïzena',5]],
 ingredientsAdultes:['50 cl de lait entier ou de croissance','25 g de fécule de maïs (Maïzena)','1 gousse de vanille','1 banane très mûre (100 g)'],
 etapes:['Délayer la fécule dans 5 cl de lait froid.','Chauffer le reste du lait avec la gousse fendue et grattée jusqu\'au frémissement.','Retirer la gousse, verser la fécule délayée et remuer 2 à 3 min jusqu\'à épaississement.','Hors du feu, ajouter la banane mixée.','Répartir dans les ramequins et laisser 2 h au réfrigérateur.'],
 conseils:['Vraie vanille en gousse : le sucre vanillé contient du sucre.','24 h au réfrigérateur, filmée au contact.','Texture lisse, parfaite les jours de poussée dentaire.']},
{id:'s-rizaulait',titre:'Riz au lait à la pomme',type:'Dessert',temps:'40 min',rendement:'4 portions',kind:'bowl',vis:[['Lait',60],['Riz',25],['Pomme',15]],
 ingredientsAdultes:['60 g de riz rond','50 cl de lait entier','1 pomme douce (150 g)','½ gousse de vanille ou 1 pincée de cannelle'],
 etapes:['Rincer le riz à l\'eau froide.','Porter le lait à frémissement avec la vanille, ajouter le riz.','Cuire 30 à 35 min à feu très doux en remuant souvent : le riz doit être très fondant.','Râper la pomme et l\'ajouter 5 min avant la fin.','Laisser tiédir avant de servir.'],
 conseils:['Riz plus cuit que pour les adultes, sans grain ferme.','La pomme râpée apporte toute la douceur.','48 h au réfrigérateur.']},
{id:'s-biscuits',titre:'Biscuits moelleux pomme-avoine',type:'Goûter',temps:'25 min',rendement:'12 biscuits',kind:'plate',vis:[['Flocons d\'avoine',50],['Compote',30],['Banane',20]],
 ingredientsAdultes:['100 g de flocons d\'avoine','100 g de compote de pomme sans sucre','1 banane mûre','2 c. à soupe d\'huile de colza','1 pincée de cannelle'],
 etapes:['Préchauffer le four à 180 °C.','Écraser la banane et mélanger avec la compote, l\'huile, la cannelle et les flocons.','Laisser reposer 10 min pour que les flocons gonflent.','Former 12 petites boules, les aplatir sur une plaque recouverte de papier cuisson.','Cuire 15 min : ils restent moelleux.'],
 conseils:['Ils se défont en bouche : parfaits en DME.','L\'avoine peut contenir du gluten.','3 jours en boîte hermétique.']},
{id:'s-clafoutis',titre:'Clafoutis à la poire sans sucre',type:'Dessert',temps:'45 min',rendement:'4 parts',kind:'tart',vis:[['Poire',50],['Lait',30],['Œuf',12],['Farine',8]],
 ingredientsAdultes:['2 poires bien mûres (300 g)','2 œufs','40 g de farine','25 cl de lait','½ gousse de vanille','1 noisette de beurre pour le plat'],
 etapes:['Préchauffer le four à 180 °C et beurrer un petit plat.','Couper les poires en dés et les répartir dans le plat.','Battre les œufs avec la farine, puis ajouter le lait et les graines de vanille.','Verser sur les poires et cuire 30 à 35 min : le centre doit être bien pris.','Laisser tiédir avant de couper.'],
 conseils:['Œufs cuits à cœur : la lame ressort sèche.','Des poires très mûres suffisent à sucrer.','48 h au réfrigérateur.']},
{id:'s-pommesfour',titre:'Pommes cuites au four, cannelle',type:'Dessert',temps:'35 min',rendement:'2 pommes',kind:'bowl',vis:[['Pomme',95],['Beurre',5]],
 ingredientsAdultes:['2 pommes douces (Gala, Reine des reinettes)','1 noisette de beurre','1 pincée de cannelle'],
 etapes:['Préchauffer le four à 180 °C.','Évider les pommes et les poser dans un plat avec un fond d\'eau.','Déposer un peu de beurre et de cannelle dans chaque pomme.','Cuire 25 à 30 min jusqu\'à ce qu\'elles soient fondantes.','Retirer la peau et écraser la chair pour Johan.'],
 conseils:['Peau retirée : elle reste coriace même cuite.','Servir tiède, écrasée ou en petits morceaux fondants.','Les adultes peuvent ajouter un yaourt.']}];
function allSweets(){const o={};SWEETS.forEach(s=>o[s.id]={...s,base:true});
  Object.entries(state.sweets).forEach(([id,v])=>{o[id]={...(o[id]||{}),...v,id,base:false,orig:!!SWEETS.find(s=>s.id===id)}});return o}
function saveSweet(s){const id=s.id||('u-'+Date.now().toString(36)+Math.random().toString(36).slice(2,5));const v={...s,id};delete v.base;delete v.orig;
  state.sweets[id]=v;saveLocal();if(state.db)queued('s'+id,()=>state.db.collection('sweets').doc(id).set(v));return id}
function deleteSweet(id){delete state.sweets[id];saveLocal();if(state.db)queued('s'+id,()=>state.db.collection('sweets').doc(id).delete())}
function sweetItems(s){if(Array.isArray(s.vis)&&s.vis.length)return s.vis.map(([nom,g])=>({nom,g,cat:catOf(nom)}));
  const n=(s.ingredientsAdultes||[]).slice(0,3).map(l=>ingToCourse(l).nom).filter(Boolean);return (n.length?n:['Fruits']).map(nom=>({nom,g:1,cat:catOf(nom)}))}
function renderSweets(){
  const list=Object.values(allSweets()),types=[...new Set(list.map(s=>s.type||'Dessert'))],f=state.sweetFilter||'Tous';
  let h=`<div class="sweethead"><div><span class="eyebrow">Sans date · toute l'année</span><h2>Plaisir sucré</h2>
    <p class="muted">Desserts et goûters pour Johan, sans sucre ajouté : la douceur vient des fruits mûrs, de la vanille et du lait. Pas de miel, pas de sirop.</p></div>
    <button class="btn primary" data-addsweet>Ajouter une recette sucrée</button></div>
    <div class="chips" role="group" aria-label="Filtrer"><button class="chip" data-sf="Tous" aria-pressed="${f==='Tous'}">Toutes · ${list.length}</button>${types.map(t=>`<button class="chip" data-sf="${esc(t)}" aria-pressed="${f===t}">${esc(t)}</button>`).join('')}</div><div class="recipes">`;
  list.filter(s=>f==='Tous'||(s.type||'Dessert')===f).forEach(s=>h+=sweetCard(s));
  return h+'</div>'}
function sweetCard(s){
  if(state.editing==='S:'+s.id)return `<article class="rcard" id="s-${s.id}"><header><div class="meta"><span class="pill sweet">${esc(s.type||'Dessert')}</span><span>Modifier la recette</span></div><h2>${esc(s.titre)}</h2></header><div style="grid-column:1/-1">${editorHTML(s,'se',{sweet:true})}
    <div class="eactions" style="margin-top:12px"><button class="btn primary" data-ssave="${s.id}">Enregistrer</button><button class="btn ghost" data-ecancel>Annuler</button></div></div></article>`;
  const ing=s.ingredientsAdultes||[],st=s.etapes||[],tips=s.conseils||[],al=[...new Set(ing.map(allergenOf).filter(Boolean))];
  return `<article class="rcard" id="s-${s.id}"><header><div class="meta"><span class="pill sweet">${esc(s.type||'Dessert')}</span>${s.temps?`<span>${esc(s.temps)}</span>`:''}${s.rendement?`<span>· ${esc(s.rendement)}</span>`:''}
     ${s.base?'':`<span class="pill imp">${s.orig?'Modifiée':'Ajoutée'}</span>`}</div><h2>${esc(s.titre)}</h2>${starsHTML(ratingOf(s.titre),`data-rk="sweet" data-rid="${s.id}"`,true)}
     <div class="baby">${esc(s.sucre||'Sans sucre ajouté')}</div>${s.note?`<div class="notesrc">${esc(s.note)}</div>`:''}</header>
    <figure class="plate">${plateSVG(sweetItems(s),s.kind||'bowl',s.id,true)}<figcaption><div class="eyebrow">Dès 12 mois</div>${al.length?`<p style="margin:6px 0 0">Contient : ${al.map(a=>`<span class="pill al">${a}</span>`).join(' ')}</p>`:''}</figcaption></figure>
    <div class="rbody"><div><h4>Ingrédients</h4>${ing.length?`<ul class="plainul">${ing.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`:'<p class="muted">Pas d\'ingrédients.</p>'}</div>
     ${st.length?`<div><h4>Préparation</h4><ol class="steps">${st.map(x=>`<li><div>${esc(x)}${stepTimers(x,s.titre)}</div></li>`).join('')}</ol></div>`:''}
     ${tips.length?`<div class="tips"><h4>Conseils pour Johan</h4><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`:''}
     <div class="rfoot"><button class="btn primary" data-cooks="${s.id}">Cuisiner</button><button class="btn" data-sadd="${s.id}">Ajouter aux courses</button><button class="btn" data-sedit="${s.id}">Modifier</button>
      ${s.base?'':`<button class="btn danger" data-sdel="${s.id}" data-lbl="${s.orig?'Revenir à l\'origine':'Supprimer'}">${s.orig?'Revenir à l\'origine':'Supprimer'}</button>`}</div></div></article>`}

/* ---------- Mode cuisine & minuteurs ---------- */
const timers=[];let tick=null,actx=null,wlock=null;
function recipeById(kind,id){if(kind==='sweet')return allSweets()[id]||null;if(kind==='lib')return libRecipe(id);const [d,s]=id.split('_');return getMeal(d,s)}
function openCook(kind,id){state.cook={kind,id,step:0};document.body.classList.add('cooking');renderCook();lockScreen()}
function closeCook(){state.cook=null;document.body.classList.remove('cooking');const c=document.getElementById('cook');c.hidden=true;c.innerHTML='';try{wlock&&wlock.release()}catch(e){}wlock=null;renderTimerbar()}
async function lockScreen(){try{if('wakeLock' in navigator)wlock=await navigator.wakeLock.request('screen')}catch(e){wlock=null}}
document.addEventListener('visibilitychange',()=>{if(state.cook&&document.visibilityState==='visible')lockScreen()});
function findTimers(t){const out=[];const re=/(\d+)\s*h(?:eures?)?(?![a-zà-ÿ])\s*(\d{1,2})?(?!\d)|(\d+)(?:\s*(?:à|-|–|ou)\s*(\d+))?\s*(?:min\b|minutes?)/gi;let m;
  while((m=re.exec(t))){const mins=m[1]?(+m[1])*60+(+(m[2]||0)):+m[3];if(mins>0&&mins<=600&&!out.some(o=>o.mins===mins))out.push({mins,label:m[0].replace(/\s+/g,' ').trim()})}return out}
function renderCook(){
  const c=state.cook,box=document.getElementById('cook');if(!c)return;const r=recipeById(c.kind,c.id);if(!r){closeCook();return}
  const steps=r.etapes||[],n=steps.length,i=Math.min(c.step,Math.max(0,n-1)),eb=c.kind==='meal'?r.etapeBebe:-1;
  const st=steps[i]||"Cette fiche n'a pas encore d'étapes. Ajoutez-les avec « Modifier la fiche ».",tm=findTimers(st);
  const ing=r.ingredientsAdultes||[],por=c.kind==='meal'?portionOf(r):[],short=String(r.titre).split(/[,&]/)[0].trim();
  box.innerHTML=`<div class="cookin">
   <div class="cookhead"><div style="min-width:0"><span class="eyebrow">Mode cuisine · écran gardé allumé</span><b>${esc(r.titre)}</b></div><button class="iconbtn" data-cclose aria-label="Fermer le mode cuisine">×</button></div>
   <div class="ctimers" id="ctimers"></div>
   <div class="cprog"><span>Étape ${n?i+1:0} sur ${n}</span><div class="ctrack"><span style="width:${n?(i+1)/n*100:0}%"></span></div></div>
   <div class="cstep${i===eb?' bb':''}">${i===eb?'<b class="cbtag">Portion de Johan, avant d\'assaisonner</b>':''}<p>${esc(st)}</p>
    <div class="tchips">${tm.map(t=>`<button class="tchip" data-tgo="${t.mins}" data-tl="${esc(t.label)}">Minuteur ${esc(t.label)}</button>`).join('')}
     <span class="tcustom"><input type="number" id="tmin" min="1" max="600" inputmode="numeric" placeholder="min" aria-label="Durée du minuteur en minutes"><button class="tchip ghost" data-tcustom>Lancer</button></span></div></div>
   <details class="cing"><summary>Ingrédients${por.length?' et portion de Johan':''}</summary><ul>${ing.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${por.length?`<p><b>Johan :</b> ${por.map(p=>esc(p.nom)+' '+p.g+' g').join(' · ')}</p>`:''}</details>
   <div class="cnav"><button class="btn big" data-cprev ${i<=0?'disabled':''}>Précédente</button><button class="btn primary big" data-cnext>${i>=n-1?'Terminer':'Suivante'}</button></div></div>`;
  box.hidden=false;
  box.querySelector('[data-cclose]').onclick=closeCook;
  box.querySelector('[data-cprev]').onclick=()=>{c.step=Math.max(0,i-1);renderCook()};
  box.querySelector('[data-cnext]').onclick=()=>{if(i>=n-1){closeCook();toast('Bon appétit !')}else{c.step=i+1;renderCook()}};
  box.querySelectorAll('[data-tgo]').forEach(b=>b.onclick=()=>startTimer(+b.dataset.tgo,short+' · '+b.dataset.tl));
  box.querySelector('[data-tcustom]').onclick=()=>{const v=+document.getElementById('tmin').value;if(v>0&&v<=600)startTimer(v,short+' · '+v+' min')};
  renderTimers()}
function beep(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t0=actx.currentTime;
  [0,.35,.7].forEach(d=>{const o=actx.createOscillator(),g=actx.createGain();o.frequency.value=880;o.connect(g);g.connect(actx.destination);g.gain.setValueAtTime(.0001,t0+d);g.gain.exponentialRampToValueAtTime(.3,t0+d+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d+.3);o.start(t0+d);o.stop(t0+d+.32)})}catch(e){}}
function startTimer(mins,label){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();actx.resume&&actx.resume()}catch(e){}
  timers.push({id:String(Date.now())+Math.floor(Math.random()*1e4),label,end:Date.now()+mins*60000,done:false,rings:0,last:0});if(!tick)tick=setInterval(tickTimers,1000);renderTimers();toast(`Minuteur lancé : ${mins} min`)}
function fmtT(ms){const s=Math.max(0,Math.round(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+':'+pad(m):m)+':'+pad(x)}
function tickTimers(){const now=Date.now();timers.forEach(t=>{if(!t.done&&now>=t.end){t.done=true;toast('Minuteur terminé : '+t.label)}
    if(t.done&&t.rings<4&&now-t.last>=15000){t.rings++;t.last=now;beep();try{navigator.vibrate&&navigator.vibrate([300,150,300])}catch(e){}}});
  if(!timers.length){clearInterval(tick);tick=null}renderTimers()}
function timersHTML(){return timers.map(t=>`<div class="tmr${t.done?' done':''}"><b>${t.done?'Terminé':fmtT(t.end-Date.now())}</b><span>${esc(t.label)}</span><button data-tstop="${t.id}" aria-label="Arrêter ce minuteur">×</button></div>`).join('')}
function stopBtn(b){b.onclick=()=>{const k=timers.findIndex(t=>t.id===b.dataset.tstop);if(k>=0)timers.splice(k,1);renderTimers()}}
function renderTimers(){const a=document.getElementById('ctimers');if(a){a.innerHTML=timersHTML();a.querySelectorAll('[data-tstop]').forEach(stopBtn)}renderTimerbar()}
function renderTimerbar(){const tb=document.getElementById('timerbar');if(!tb)return;const show=timers.length>0&&!state.cook;tb.hidden=!show;if(show){tb.innerHTML=timersHTML();tb.querySelectorAll('[data-tstop]').forEach(stopBtn)}}
document.addEventListener('keydown',e=>{if(!state.cook||e.target.tagName==='INPUT')return;if(e.key==='Escape')closeCook();else if(e.key==='ArrowRight')document.querySelector('[data-cnext]')?.click();else if(e.key==='ArrowLeft')document.querySelector('[data-cprev]')?.click()});


/* ---------- Notes & bibliothèque ---------- */
const rKey=t=>'r-'+norm(t).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,90);
const clean=o=>JSON.parse(JSON.stringify(o));
function starsHTML(v,attrs,big){let h=`<div class="stars${big?' big':''}" role="group" aria-label="Note sur 5">`;for(let n=1;n<=5;n++)h+=`<button type="button" class="star${n<=v?' on':''}" ${attrs} data-star="${n}" aria-label="${n} étoile${n>1?'s':''} sur 5" aria-pressed="${n<=v}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg></button>`;return h+'</div>'}
function ratingOf(t){const r=state.ratings[rKey(t)];return r?r.stars||0:0}
function setRating(kind,id,stars){
  let rec,titre,data;
  if(kind==='sweet'){rec=allSweets()[id];if(!rec)return;titre=rec.titre;data={titre,kind:'sweet',sweetId:id}}
  else if(kind==='lib'){const r=state.ratings[id];if(!r)return;titre=r.titre;data={...r}}
  else{const [d,sl]=id.split('_');rec=getMeal(d,sl);if(!rec)return;titre=rec.titre;
    const {_i,_id,date,slot,base,empty,moved,modifie,...rest}=rec;data={titre,kind:'meal',recette:clean(rest),lastDate:d}}
  const k=kind==='lib'?id:rKey(titre),cur=state.ratings[k];
  if(cur&&cur.stars===stars&&kind!=='lib'||stars===0){delete state.ratings[k];saveLocal();if(state.db)queued('r'+k,()=>state.db.collection('ratings').doc(k).delete());return 0}
  const v=clean({...(cur||{}),...data,stars,at:new Date().toISOString(),by:store.user?firstName(store.user):''});
  state.ratings[k]=v;saveLocal();if(state.db)queued('r'+k,()=>state.db.collection('ratings').doc(k).set(v));return stars}
function libRecipe(id){const r=state.ratings[id];if(!r)return null;return r.kind==='sweet'?allSweets()[r.sweetId]||null:(r.recette?{...r.recette,titre:r.titre}:null)}
function renderLibrary(){
  const sort=state.libSort||'stars',kind=state.libKind||'all',min=state.libMin||0;
  let list=Object.entries(state.ratings).map(([id,r])=>({id,...r})).filter(r=>r.stars>0);
  const counts={all:list.length,meal:list.filter(r=>r.kind!=='sweet').length,sweet:list.filter(r=>r.kind==='sweet').length};
  list=list.filter(r=>(kind==='all'||(kind==='sweet')===(r.kind==='sweet'))&&r.stars>=min);
  list.sort((a,b)=>sort==='stars'?(b.stars-a.stars)||a.titre.localeCompare(b.titre,'fr'):sort==='low'?(a.stars-b.stars)||a.titre.localeCompare(b.titre,'fr'):sort==='recent'?String(b.at).localeCompare(String(a.at)):a.titre.localeCompare(b.titre,'fr'));
  let h=`<div class="sweethead"><div><span class="eyebrow">Vos recettes notées</span><h2>Bibliothèque de recettes</h2>
    <p class="muted">Chaque recette notée d'au moins une étoile arrive ici. Replacez-la dans le planning en deux touches.</p></div></div>
   <div class="libbar"><div class="chips" role="group" aria-label="Type">${[['all','Toutes'],['meal','Repas'],['sweet','Plaisir sucré']].map(([k,l])=>`<button class="chip" data-lk="${k}" aria-pressed="${kind===k}">${l} · ${counts[k]}</button>`).join('')}</div>
    <div class="libsel"><label for="libSort" class="eyebrow">Trier</label><select id="libSort"><option value="stars" ${sort==='stars'?'selected':''}>Mieux notées d'abord</option><option value="low" ${sort==='low'?'selected':''}>Moins bien notées d'abord</option><option value="recent" ${sort==='recent'?'selected':''}>Notées récemment</option><option value="alpha" ${sort==='alpha'?'selected':''}>Ordre alphabétique</option></select>
    <label for="libMin" class="eyebrow">Au moins</label><select id="libMin">${[0,3,4,5].map(n=>`<option value="${n}" ${min===n?'selected':''}>${n?n+' étoile'+(n>1?'s':''):'Toutes les notes'}</option>`).join('')}</select></div></div>`;
  if(!counts.all)return h+`<div class="empty-week"><h3>Aucune recette notée pour l'instant</h3><p class="muted">Ouvrez une fiche dans Recettes ou Plaisir sucré et touchez les étoiles sous son titre.</p><button class="btn primary" data-go="recettes">Voir les recettes</button></div>`;
  if(!list.length)return h+`<p class="muted">Aucune recette ne correspond à ce filtre.</p>`;
  h+='<div class="libgrid">';
  list.forEach(r=>{const rec=libRecipe(r.id),sweet=r.kind==='sweet';
    const items=rec?(sweet?sweetItems(rec):portionOf({...rec,slot:'midi'})):[];
    h+=`<article class="libcard" id="lib-${r.id}"><div class="libtop"><div class="libpl">${rec?plateSVG(items,rec.kind||(sweet?'bowl':'plate'),r.id,false):''}</div>
      <div style="min-width:0"><div class="meta"><span class="pill ${sweet?'sweet':''}">${sweet?esc(rec&&rec.type||'Sucré'):'Repas'}</span>${rec&&rec.temps?`<span class="muted">${esc(rec.temps)}</span>`:''}</div>
      <h3>${esc(r.titre)}</h3>${starsHTML(r.stars,`data-rk="lib" data-rid="${r.id}"`)}
      ${!sweet&&rec&&rec.bebe?`<div class="baby small">Johan : ${esc(rec.bebe)}</div>`:''}<div class="muted small">${r.by?'Noté par '+esc(r.by):''}${r.lastDate?`${r.by?' · ':''}dernière fois le ${fmtDay(r.lastDate)}`:''}</div></div></div>`;
    if(state.libPlan===r.id){const d=state.libDate||'',sl=state.libSlot||'midi',ex=d?getMeal(d,sl):null;
      h+=`<form class="planf" data-planf="${r.id}"><label>Date<input type="date" id="planDate" value="${d}" required></label><label>Repas<select id="planSlot"><option value="midi" ${sl==='midi'?'selected':''}>Midi</option><option value="soir" ${sl==='soir'?'selected':''}>Soir</option></select></label>
        ${ex?`<div class="warn">Remplace « ${esc(ex.titre)} »</div>`:''}<div class="eactions"><button class="btn primary" type="submit" ${d?'':'disabled'}>Ajouter au planning</button><button class="btn ghost" type="button" data-planx>Annuler</button></div></form>`}
    h+=`<div class="rfoot">${!sweet&&rec?`<button class="btn primary" data-plan="${r.id}">Planifier</button>`:''}${rec?`<button class="btn" data-cookl="${r.id}">Cuisiner</button>`:''}${sweet?`<button class="btn" data-go="sucre">Voir dans Plaisir sucré</button>`:''}</div></article>`});
  return h+'</div>'}
function stepTimers(st,titre){const short=String(titre||'').split(/[,&]/)[0].trim();const t=findTimers(st);if(!t.length)return '';
  return `<span class="steptimers">${t.map(x=>`<button type="button" class="tchip sm" data-tgo2="${x.mins}" data-tl="${esc(short+' · '+x.label)}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>${esc(x.label)}</button>`).join('')}</span>`}

/* ---------- Déplacer / échanger ---------- */
async function moveMeal(src,dst){if(src===dst)return '';const [sd,ss]=src.split('_'),[dd,ds]=dst.split('_');const a=getMeal(sd,ss),b=getMeal(dd,ds);if(!a)return '';
  const strip=m=>{const r={...m};delete r._i;delete r._id;delete r.empty;return r};
  await saveMeal({...strip(a),date:dd,slot:ds,base:false,moved:true});
  if(b)await saveMeal({...strip(b),date:sd,slot:ss,base:false,moved:true});
  else if(BASE[src])await saveMeal({date:sd,slot:ss,empty:true});
  else{delete state.imported[src];saveLocal();if(state.db)queued('m'+src,()=>state.db.collection('meals').doc(src).delete())}
  return b?'swap':'move'}

/* ---------- Articles libres & copie ---------- */
const RAYONS_ALL=[...RAYONS,'Divers & maison'];
function ingToCourse(s){const t=String(s).replace(/\(.*?\)/g,'').trim();const m=t.match(/^([\d.,/½¼¾\s]+(?:kg|g|ml|cl|l|c\.?\s*à\s*(?:soupe|café)|cuill[eè]res?(?:\s*à\s*(?:soupe|café))?|tranches?|pinc[ée]es?|gousses?|bottes?|noisettes?)?\.?)\s*(?:d['’]\s*|de\s+|des\s+|du\s+)?(.*)$/i);
  const cap=x=>x.charAt(0).toUpperCase()+x.slice(1);return m&&m[2]?{nom:cap(m[2].trim()),quantite:m[1].trim(),rayon:''}:{nom:cap(t),quantite:'',rayon:''}}
function rayonExtra(n){const x=norm(n);if(/pomme|poire|banane|fruit|legume|salade|tomate|carotte|courge|potiron|potimarron|butternut|poireau|oignon|\bail\b|echalote|citron|orange|clementine|kiwi|raisin|champignon|epinard|haricot|brocoli|chou|courgette|aubergine|poivron|herbe|persil|ciboulette|myrtille|framboise|avocat|patate|panais|navet|celeri|radis|concombre/.test(x))return RAYONS[0];
  const r=rayonOf(n);return r===RAYONS[0]?'Divers & maison':r}
function addExtra(week,nom,quantite){const id=week+'~x'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);const d={week,nom,quantite:quantite||'',rayon:rayonExtra(nom),at:new Date().toISOString()};
  if(store.user)d.by=firstName(store.user);state.extras[id]=d;saveLocal();if(state.db)queued('x'+id,()=>state.db.collection('extras').doc(id).set(d))}
function delExtra(id){const x=state.extras[id];if(!x)return;delete state.extras[id];setCheck(x.week,'x|'+id,false);saveLocal();if(state.db)queued('x'+id,()=>state.db.collection('extras').doc(id).delete())}
function listText(week){const {groups}=shoppingFor(week),ch=state.checks[week]||{};const all=RAYONS_ALL.flatMap(r=>groups[r].map(i=>({...i,r})));
  let rest=all.filter(i=>!ch[i.k]);const head=rest.length&&rest.length<all.length?'Reste à acheter':'Liste de courses';if(!rest.length)rest=all;
  let t=`Jojo cooker · ${head}\nSemaine ${weekLabel(week)}\n`;RAYONS_ALL.forEach(r=>{const g=rest.filter(i=>i.r===r);if(!g.length)return;t+=`\n${r.toUpperCase()}\n`+g.map(i=>`- ${i.n}${i.q?' : '+i.q:''}`).join('\n')+'\n'});return t}

/* ---------- Aliments goûtés par Johan ---------- */
const ALLERG=[[/oeuf|omelette/,'Œuf'],[/\blait|beurre|comte|chevre|yaourt|fromage|creme|emmental|gruyere|parmesan|ricotta|mozzarella/,'Lait'],[/cabillaud|saumon|poisson|colin|merlu|lieu|truite|dorade|sardine|thon|maquereau/,'Poisson'],[/\bpates?\b|coquillette|pain|semoule|farine|\bble\b|avoine|biscuit|epeautre|orge|seigle|boulgour/,'Gluten'],[/crevette|crabe|homard|langoustine/,'Crustacés'],[/arachide|cacahuete/,'Arachide'],[/\bnoix|amande|noisette|cajou|pistache/,'Fruits à coque'],[/soja|tofu/,'Soja'],[/sesame/,'Sésame'],[/celeri/,'Céleri'],[/moutarde/,'Moutarde']];
const STRIPW=new Set(['cuit','cuite','cuits','cuites','dur','rape','rapee','frais','fraiche','emiette','emiettee','hache','hachee','bien','ecrase','ecrasee','mixe','mixee','fondant','fondants','tendre','tendres']);
const CANON=[[/omelette|\boeufs?\b/,'Œuf'],[/patate douce/,'Patate douce'],[/grenaille|pomme de terre|\bpdt\b/,'Pomme de terre'],[/\briz\b/,'Riz'],[/coquillette|\bpates?\b|vermicelle|nouille/,'Pâtes'],[/comte/,'Comté'],[/\bpain\b/,'Pain'],[/chevre/,'Chèvre frais'],[/steak|boeuf/,'Bœuf'],[/huile de colza/,'Huile de colza'],[/huile d.?olive/,"Huile d'olive"],[/^lait\b|\blait\b/,'Lait'],[/beurre/,'Beurre'],[/jambon/,'Jambon blanc'],[/carotte/,'Carotte'],[/poireau/,'Poireau'],[/champignon/,'Champignon'],[/epinard/,'Épinards'],[/haricots? vert/,'Haricots verts']];
function canonFood(n){const x=norm(n);for(const [re,c] of CANON)if(re.test(x))return c;const w=String(n).trim().split(/\s+/).filter(t=>!STRIPW.has(norm(t)));const s=w.join(' ')||String(n).trim();return s.charAt(0).toUpperCase()+s.slice(1)}
const foodId=n=>'f-'+norm(canonFood(n)).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function allergenOf(n){const x=norm(n);for(const [re,l] of ALLERG)if(re.test(x))return l;return ''}
const isTasted=id=>!!(state.foods[id]&&state.foods[id].tasted);
const tracking=()=>Object.keys(state.foods).length>0;
function setFood(id,patch){const v={...(state.foods[id]||{}),...patch};state.foods[id]=v;saveLocal();if(state.db)queued('f'+id,()=>state.db.collection('foods').doc(id).set(v))}
function foodsUniverse(){const u={};const add=(nom,cat,date,slot)=>{const id=foodId(nom);if(!u[id])u[id]={id,nom:canonFood(nom),cat,uses:[]};if(date)u[id].uses.push({date,slot})};
  new Set([...Object.keys(BASE),...Object.keys(state.imported)]).forEach(k=>{const [d,s]=k.split('_');const m=getMeal(d,s);if(m)portionOf(m).forEach(p=>add(p.nom,p.cat,d,s))});
  Object.entries(state.foods).forEach(([id,f])=>{if(!u[id]&&f.nom)u[id]={id,nom:f.nom,cat:f.cat||catOf(f.nom),uses:[]}});return u}
const REACT=[['aime','Aime'],['mitige','Mitigé'],['refuse','Refuse'],['reaction','Réaction']];
function foodRow(f,sub){const st=state.foods[f.id]||{},t=!!st.tasted,al=allergenOf(f.nom);
  return `<div class="frow${t?' ok':''}${st.reaction==='reaction'?' alert':''}"><label class="fchk" for="fc-${f.id}"><input type="checkbox" id="fc-${f.id}" data-ft="${f.id}" data-fn="${esc(f.nom)}" data-fc="${f.cat||''}" ${t?'checked':''}>
   <span><b>${esc(f.nom)}</b>${al?` <span class="pill al">${al}</span>`:''}<small>${sub?esc(sub):t?`Goûté${st.date?' le '+fmtDay(st.date):''}${st.by?' · noté par '+esc(st.by):''}`:'Pas encore goûté'}</small></span></label>
   ${t?`<div class="react" role="group" aria-label="Réaction de Johan">${REACT.map(([k,l])=>`<button type="button" class="rchip r-${k}${st.reaction===k?' on':''}" data-fr="${f.id}" data-rv="${k}" aria-pressed="${st.reaction===k}">${l}</button>`).join('')}</div>`:''}</div>`}
function renderJohan(){
  const U=foodsUniverse(),w0=state.week,w1=addDays(w0,6),all=Object.values(U).sort((a,b)=>a.nom.localeCompare(b.nom,'fr'));
  const tasted=all.filter(f=>isTasted(f.id)).length;
  const week=all.map(f=>({...f,wk:f.uses.filter(u=>u.date>=w0&&u.date<=w1).sort((a,b)=>(a.date+(a.slot==='midi'?0:1)).localeCompare(b.date+(b.slot==='midi'?0:1)))})).filter(f=>f.wk.length&&!isTasted(f.id))
    .sort((a,b)=>a.wk[0].date.localeCompare(b.wk[0].date));
  let h=`<div class="jhead"><span class="eyebrow">Diversification</span><h2>Ce que Johan a goûté</h2><p class="muted">${tasted} aliment${tasted>1?'s':''} goûté${tasted>1?'s':''} sur ${all.length}. Cochez au fur et à mesure et notez sa réaction : c'est partagé entre vous deux.</p>
    <div class="track"><span style="width:${all.length?tasted/all.length*100:0}%"></span></div></div>
    <section class="jsec"><h3>Nouveaux au menu de cette semaine</h3>`;
  h+=week.length?`<div class="jlist">${week.map(f=>foodRow(f,`Première fois : ${fmtLong(f.wk[0].date).toLowerCase()} ${f.wk[0].slot}`)).join('')}</div>`:`<p class="muted">Rien de nouveau cette semaine : Johan connaît déjà tous les aliments prévus.</p>`;
  if(week.some(f=>allergenOf(f.nom)))h+=`<div class="note">Repère courant : un seul allergène nouveau à la fois, plutôt le midi et à la maison, puis 2 à 3 jours avant le suivant pour repérer une réaction. En cas de doute, demandez l'avis de votre pédiatre.</div>`;
  h+=`</section><section class="jsec"><h3>Tous les aliments</h3><form class="addx" id="addf" autocomplete="off"><input id="fName" placeholder="Ajouter un aliment goûté ailleurs : kiwi, lentilles…" aria-label="Aliment goûté" required><button class="btn primary" type="submit">Ajouter</button></form>`;
  ['leg','fec','pro','lait','gras'].forEach(c=>{const g=all.filter(f=>(CATS[f.cat]?f.cat:'leg')===c);if(!g.length)return;
    h+=`<h4 class="jcat"><span class="sw" style="background:var(${CATS[c][1]})"></span>${CATS[c][0]} <span class="muted">${g.filter(f=>isTasted(f.id)).length}/${g.length}</span></h4><div class="jlist">${g.map(f=>foodRow(f)).join('')}</div>`});
  return h+'</section>'}

/* ---------- Rendu ---------- */
const main=document.getElementById('main');
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,3200)}
function setTab(t,opts={}){state.tab=t;state.editing=null;state.swap=null;state.libPlan=null;if(t!=='importer')state.importHint=null;try{history.replaceState(null,'','#'+t)}catch(e){}render();if(!opts.keepScroll)window.scrollTo({top:0})}
document.querySelectorAll('.tabbar button').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
function weekbar(){
  const isCur=mondayOf(TODAY)===state.week;
  return `<div class="weekbar"><button class="iconbtn" data-wk="-7" aria-label="Semaine précédente">‹</button>
   <div class="lbl"><span class="eyebrow">${isCur?'Cette semaine':'Semaine'}</span><b>${weekLabel(state.week)}</b></div>
   <button class="iconbtn" data-wk="7" aria-label="Semaine suivante">›</button>
   ${isCur?'':`<button class="btn ghost" data-wk="today">Aujourd'hui</button>`}</div>`}
function render(){
  document.querySelectorAll('.tabbar button').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===state.tab));
  if(state.tab==='calendrier')main.innerHTML=weekbar()+renderCalendar();
  else if(state.tab==='courses')main.innerHTML=weekbar()+renderShopping();
  else if(state.tab==='recettes')main.innerHTML=weekbar()+renderRecipes();
  else if(state.tab==='sucre')main.innerHTML=renderSweets();
  else if(state.tab==='biblio')main.innerHTML=renderLibrary();
  else if(state.tab==='johan')main.innerHTML=weekbar()+renderJohan();
  else renderImport();
  main.querySelectorAll('[data-wk]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.wk;state.editing=null;state.week=v==='today'?mondayOf(TODAY):addDays(state.week,+v);state.dayFilter=null;render()}));
  bind();
}
function renderCalendar(){
  const sw=state.swap;
  const top=`<div class="calbar"><button class="btn${sw?' primary':''}" data-swap>${sw?'Terminer':'Déplacer ou échanger des repas'}</button>${sw?`<span class="muted">${sw.src?'Touchez la case de destination, même dans une autre semaine. Touchez à nouveau le repas pour annuler.':'Touchez le repas à déplacer.'}</span>`:''}</div>`;
  if(!weekHasMeals(state.week)&&!(sw&&sw.src))return top+emptyWeek();
  let h=top+'<div class="cal">';
  for(let i=0;i<7;i++){const date=addDays(state.week,i),today=date===TODAY;
    h+=`<section class="day${today?' today':''}"><h3>${JOURS[i]} <span>${today?'<span class="tag">Aujourd\'hui · </span>':''}${fmtDay(date)}</span></h3>`;
    for(const s of ['midi','soir']){const id=`${date}_${s}`,m=getMeal(date,s),lab=s==='midi'?'Midi':'Soir';
      if(!m){if(sw&&sw.src)h+=`<button class="meal empty tgt" data-sw="${id}"><span class="pill ${s}">${lab}</span> Déposer ici</button>`;
        else h+=`<div class="meal empty"><span class="pill ${s}">${lab}</span> Rien de prévu${state.imported[id]&&state.imported[id].empty&&BASE[id]?` · <button class="linkbtn" data-restore="${id}">Rétablir le repas prévu</button>`:''}</div>`;continue}
      const cls=sw?(sw.src===id?' sel':sw.src?' tgt':''):'';
      h+=`<button class="meal${cls}" ${sw?`data-sw="${id}"`:`data-open="${id}"`}><span class="slot"><span class="pill ${s}">${lab}</span>${m.base?'':`<span class="pill imp">${m.fromLibrary?'Bibliothèque':m.moved?'Déplacé':m.modifie?'Modifié':'Importé'}</span>`}${sw&&sw.src===id?'<span class="pill">Sélectionné</span>':''}</span>
        <span class="t">${esc(m.titre)}</span><span class="b">Johan : ${esc(m.bebe||'portion à définir')} · 200 g</span>
        <span class="pl">${plateSVG(portionOf(m),m.kind||'plate',date+s,false)}</span></button>`}
    h+='</section>'}
  h+='</div>';
  h+=`<div class="note"><b>Repère pour Johan (13 mois) :</b> 20 à 30 g de viande, poisson ou œuf par jour en tout. Le planning en met 20 g le midi et 10 g ou moins le soir. Pas de sel ajouté dans sa portion.</div>`;
  return h}
function emptyWeek(){return `<div class="empty-week"><h3>Aucun repas cette semaine</h3><p class="muted">Collez ou déposez un menu dans l'onglet Importer : il sera placé sur les jours que vous choisirez.</p><button class="btn primary" data-go="importer">Importer un menu</button></div>`}
function weekMealList(){const out=[];for(let i=0;i<7;i++)for(const s of ['midi','soir']){const d=addDays(state.week,i),m=getMeal(d,s);if(m)out.push({...m,_i:i,_id:`${d}_${s}`})}return out}
function renderRecipes(){
  const list=weekMealList();if(!list.length)return emptyWeek();
  if(state.dayFilter===null){const t=TODAY>=state.week&&TODAY<=addDays(state.week,6)?dayIdx(TODAY):'all';state.dayFilter=t}
  let h=`<div class="chips" role="group" aria-label="Filtrer par jour"><button class="chip" data-day="all" aria-pressed="${state.dayFilter==='all'}">Toute la semaine</button>`;
  JOURS.forEach((j,i)=>{if(list.some(m=>m._i===i))h+=`<button class="chip" data-day="${i}" aria-pressed="${state.dayFilter===i}">${j}</button>`});
  h+='</div><div class="recipes">';
  list.filter(m=>state.dayFilter==='all'||m._i===state.dayFilter).forEach(m=>h+=recipeCard(m));
  return h+'</div>'}
function recipeCard(m){
  if(state.editing===m._id)return `<article class="rcard" id="r-${m._id}"><header><div class="meta"><span class="pill ${m.slot}">${JOURS[m._i]} ${m.slot}</span><span>Modifier la fiche</span></div><h2>${esc(m.titre)}</h2></header><div style="grid-column:1/-1">${editorHTML(m,'re')}
    <div class="eactions" style="margin-top:12px"><button class="btn primary" data-esave="${m._id}">Enregistrer la fiche</button><button class="btn ghost" data-ecancel>Annuler</button></div></div></article>`;
  const items=portionOf(m),steps=Array.isArray(m.etapes)?m.etapes:[],ing=Array.isArray(m.ingredientsAdultes)?m.ingredientsAdultes:[],tips=Array.isArray(m.conseils)?m.conseils:[];
  let h=`<article class="rcard" id="r-${m._id}"><header>
    <div class="meta"><span class="pill ${m.slot}">${JOURS[m._i]} ${m.slot==='midi'?'midi':'soir'}</span>${m.temps?`<span>${esc(m.temps)}</span>`:''}${m.base?'':`<span class="pill imp">${m.modifie?'Modifiée':m.fromLibrary?'Bibliothèque':m.recetteFournie===false?'Fiche proposée par Claude':m.source==='photo'?'Depuis une photo':'Importé'}</span>`}</div>
    <h2>${esc(m.titre)}</h2>${starsHTML(ratingOf(m.titre),`data-rk="meal" data-rid="${m._id}"`,true)}<div class="baby">Johan : ${esc(m.bebe||'portion à définir')}</div>${m.note?`<div class="notesrc">${esc(m.note)}</div>`:''}</header>
    ${portionFigure(m)}<div class="rbody">`;
  h+=`<div class="ing"><div><h4>Ingrédients · 2 adultes + Johan</h4>${ing.length?`<ul>${ing.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`:'<p class="muted">Pas de liste d\'ingrédients dans le texte importé.</p>'}</div>
    <div class="johan"><h4>Portion de Johan</h4><ul>${items.map(i=>`<li><span>${esc(i.nom)}${tracking()&&!isTasted(foodId(i.nom))?' <span class="pill new">nouveau</span>':''}</span><span>${i.g} g</span></li>`).join('')}<li><span>Total</span><span>${items.reduce((s,i)=>s+i.g,0)} g</span></li></ul></div></div>`;
  if(steps.length)h+=`<div><h4>Préparation</h4><ol class="steps">${steps.map((s,i)=>i===m.etapeBebe?`<li class="bb"><div><b>Portion de Johan, avant d'assaisonner</b>${esc(s)}${stepTimers(s,m.titre)}</div></li>`:`<li><div>${esc(s)}${stepTimers(s,m.titre)}</div></li>`).join('')}</ol></div>`;
  else h+=`<p class="muted">Pas d'étapes dans le texte importé. Collez la recette dans l'onglet Importer pour compléter la fiche.</p>`;
  if(tips.length)h+=`<div class="tips"><h4>Texture et sécurité pour Johan</h4><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  const orig=!m.base&&BASE[m._id];
  h+=`<div class="rfoot"><button class="btn primary" data-cook="${m._id}">Cuisiner</button><button class="btn" data-edit="${m._id}">Modifier la fiche</button>${m.base?'':`<button class="btn danger" data-del="${m._id}" data-lbl="${orig?'Revenir à la fiche d\'origine':'Retirer ce repas'}">${orig?'Revenir à la fiche d\'origine':'Retirer ce repas'}</button>`}</div>`;
  return h+'</div></article>'}
function rayonOf(name){const n=norm(name);
  if(/cabillaud|poisson|saumon|colin|merlu|lieu|truite|dorade|dinde|poulet|volaille|veau|steak|boeuf|viande|hache|porc|agneau|jambon|lardon|saucisse|crevette/.test(n))return RAYONS[1];
  if(/oeuf|lait|creme|beurre|fromage|comte|chevre|yaourt|emmental|gruyere|parmesan|ricotta|mozzarella|pate brisee|pate feuilletee/.test(n))return RAYONS[2];
  if(/\briz\b|\bpates?\b|coquillette|semoule|farine|huile|sel|poivre|epice|herbes de provence|bouillon|cidre|vin|sucre|pain|biscotte|lentille|conserve|muscade|bouquet garni|vinaigre|moutarde/.test(n))return RAYONS[3];
  return RAYONS[0]}
function shoppingFor(week){
  const groups={};RAYONS_ALL.forEach(r=>groups[r]=[]);
  const list=weekMealList();const anyBase=list.some(m=>m.base);
  if(anyBase&&week===BASE_WEEK)RAYONS.forEach(r=>BASE_LIST[r].forEach(([n,q,note])=>groups[r].push({k:'b|'+n,n,q,note})));
  const merged={},missing=[];
  list.filter(m=>!m.base).forEach(m=>{
    const own=Array.isArray(m.courses)&&m.courses.length;
    if(!own&&week===BASE_WEEK&&anyBase&&(m.moved||m.modifie)&&BASE[m.date+'_'+m.slot]!==undefined)return;
    if(!own&&week===BASE_WEEK&&anyBase&&(m.moved||m.modifie)&&(m.etapes||[]).length&&Object.values(BASE).some(b=>b.titre===m.titre))return;
    const c=own?m.courses:(m.ingredientsAdultes||[]).map(ingToCourse);
    if(!c.length){missing.push(m);return}
    c.forEach(it=>{const nom=String(it.nom||'').trim();if(!nom)return;const key=norm(nom);const ray=RAYONS.includes(it.rayon)?it.rayon:rayonOf(nom);
      if(!merged[key])merged[key]={k:'i|'+key,n:nom,q:[],note:[],r:ray};
      if(it.quantite)merged[key].q.push(String(it.quantite));merged[key].note.push(JOURS[m._i].toLowerCase())})});
  Object.values(merged).forEach(x=>groups[x.r].push({k:x.k,n:x.n,q:x.q.join(' + '),note:'Importé · '+[...new Set(x.note)].join(', ')}));
  Object.entries(state.extras).filter(([,x])=>x.week===week).sort((a,b)=>String(a[1].at).localeCompare(String(b[1].at))).forEach(([id,x])=>{const r=RAYONS_ALL.includes(x.rayon)?x.rayon:'Divers & maison';
    groups[r].push({k:'x|'+id,n:x.nom,q:x.quantite||'',note:x.by?'Ajouté par '+x.by:'Ajouté à la main',x:id})});
  return {groups,missing}}
function renderShopping(){
  const {groups,missing}=shoppingFor(state.week),ch=state.checks[state.week]||{};
  const all=RAYONS_ALL.flatMap(r=>groups[r]),done=all.filter(i=>ch[i.k]).length;
  const form=`<form class="addx" id="addx" autocomplete="off"><input id="xName" placeholder="Ajouter un article : lessive, couches, café…" aria-label="Article à ajouter" required><input id="xQty" placeholder="Quantité" aria-label="Quantité"><button class="btn primary" type="submit">Ajouter</button></form>`;
  if(!all.length)return form+(weekHasMeals(state.week)?'<p class="muted">La liste est vide pour cette semaine.</p>':emptyWeek());
  let h=`<div class="shophead"><div class="progress"><span class="eyebrow">Dans le panier</span> <b>${done} / ${all.length} articles</b><div class="track"><span style="width:${all.length?done/all.length*100:0}%"></span></div></div>
    <div class="shopbtns"><button class="btn" data-copy>Copier la liste</button><button class="btn" data-uncheck ${done?'':'disabled'}>Tout décocher</button></div></div>${form}<div id="copybox"></div>`;
  if(state.week===BASE_WEEK&&all.length)h+=`<p class="muted" style="margin:0 0 14px">Quantités calculées recette par recette pour 2 adultes et les portions de 200 g de Johan. Les courges sont pesées brutes, avec peau et graines.</p>`;
  h+='<div class="aisles">';
  RAYONS_ALL.forEach(r=>{const g=groups[r];if(!g.length)return;const dn=g.filter(i=>ch[i.k]).length;
    h+=`<section class="aisle"><h3>${r} <span>${dn}/${g.length}</span></h3>`;
    g.forEach((it,ix)=>{const id='c'+r.length+'_'+ix+'_'+norm(it.n).replace(/[^a-z0-9]/g,'').slice(0,20);
      h+=`<label class="item${ch[it.k]?' done':''}" for="${id}"><input type="checkbox" id="${id}" data-ck="${esc(it.k)}" ${ch[it.k]?'checked':''}><span><span class="nm">${esc(it.n)}</span>${it.q?` <span class="qt">· ${esc(it.q)}</span>`:''}${it.note||typeof ch[it.k]==='string'?`<small>${esc(it.note||'')}${typeof ch[it.k]==='string'?`${it.note?' · ':''}coché par ${esc(ch[it.k])}`:''}</small>`:''}</span>${it.x?`<button type="button" class="xdel" data-xdel="${it.x}" aria-label="Supprimer ${esc(it.n)}">×</button>`:''}</label>`});
    h+='</section>'});
  h+='</div>';
  if(missing.length)h+=`<div class="note">Ces repas n'ont pas de liste d'ingrédients : ${missing.map(m=>`<b>${esc(m.titre)}</b> (${JOURS[m._i].toLowerCase()})`).join(', ')}. Collez leur recette dans Importer pour les ajouter à la liste.</div>`;
  return h}

/* ---------- Éditeur de fiche ---------- */
const CAT_OPTS=Object.entries(CATS).map(([k,[l]])=>[k,l]);
const linesOf=t=>String(t||'').split(/\r?\n/).map(x=>x.replace(/^\s*(?:[-•*·]|\d+[.)])\s*/,'').trim()).filter(Boolean);
function porRow(it){return `<div class="por"><input class="pn" value="${esc(it.nom)}" aria-label="Aliment" placeholder="Aliment"><input class="pg" type="number" inputmode="numeric" min="0" step="5" value="${it.g}" aria-label="Grammes"><select class="pc" aria-label="Catégorie">${CAT_OPTS.map(([k,l])=>`<option value="${k}" ${it.cat===k?'selected':''}>${l}</option>`).join('')}</select><button type="button" class="iconbtn" data-rmpor aria-label="Retirer cet aliment">×</button></div>`}
function stepOpts(n,sel){let o=`<option value="-1" ${sel<0?'selected':''}>Aucune étape dédiée</option>`;for(let i=0;i<n;i++)o+=`<option value="${i}" ${sel===i?'selected':''}>Étape ${i+1}</option>`;return o}
function editorHTML(m,px,opt={}){
  const steps=m.etapes||[];
  if(opt.sweet)return `<div class="editor" data-ed="${px}">
   <div class="egrid"><label>Nom de la recette<input id="${px}-titre" value="${esc(m.titre)}"></label>
    <label>Quantité obtenue<input id="${px}-rend" value="${esc(m.rendement||'')}" placeholder="12 mini-muffins"></label>
    <label>Temps<input id="${px}-temps" value="${esc(m.temps||'')}" placeholder="30 min"></label></div>
   <div class="egrid"><label>Catégorie<input id="${px}-type" value="${esc(m.type||'Dessert')}" placeholder="Goûter, Dessert, Compote"></label>
    <label>Sucre<input id="${px}-sucre" value="${esc(m.sucre||'Sans sucre ajouté')}"></label><span></span></div>
   <label>Ingrédients · un par ligne<textarea id="${px}-ing" rows="6">${esc((m.ingredientsAdultes||[]).join('\n'))}</textarea></label>
   <label>Préparation · une étape par ligne<textarea id="${px}-etp" rows="7">${esc(steps.join('\n'))}</textarea></label>
   <label>Conseils pour Johan · un par ligne<textarea id="${px}-cns" rows="3">${esc((m.conseils||[]).join('\n'))}</textarea></label></div>`;
  const items=portionOf({...m,slot:m.slot||m.slotSel||'midi'});
  return `<div class="editor" data-ed="${px}">
   <div class="egrid"><label>Plat des adultes<input id="${px}-titre" value="${esc(m.titre)}"></label>
    <label>Déclinaison pour Johan<input id="${px}-bebe" value="${esc(m.bebe||'')}"></label>
    <label>Temps<input id="${px}-temps" value="${esc(m.temps||'')}" placeholder="35 min"></label></div>
   <div><div class="ehead"><span class="eyebrow">Portion de Johan</span><span class="etotal" id="${px}-tot"></span></div>
    <div id="${px}-por">${items.map(porRow).join('')}</div>
    <div class="eactions"><button type="button" class="btn small" data-addpor>Ajouter un aliment</button><button type="button" class="btn small" data-fit>Ramener à 200 g</button></div></div>
   <label>Ingrédients · un par ligne<textarea id="${px}-ing" rows="6">${esc((m.ingredientsAdultes||[]).join('\n'))}</textarea></label>
   <label>Préparation · une étape par ligne<textarea id="${px}-etp" rows="7">${esc(steps.join('\n'))}</textarea></label>
   <label>Étape où l'on prélève la portion de Johan<select id="${px}-eb">${stepOpts(steps.length,Number.isInteger(m.etapeBebe)?m.etapeBebe:-1)}</select></label>
   <label>Courses · « article | quantité », une ligne par article<textarea id="${px}-crs" rows="5">${esc((m.courses||[]).map(c=>c.nom+(c.quantite?' | '+c.quantite:'')).join('\n'))}</textarea></label>
   <label>Conseils pour Johan · un par ligne<textarea id="${px}-cns" rows="3">${esc((m.conseils||[]).join('\n'))}</textarea></label>
  </div>`}
function readEditor(px,m){
  const $=id=>document.getElementById(px+'-'+id);if(!$('titre'))return {};
  if($('rend'))return {titre:$('titre').value.trim()||'Recette sans titre',rendement:$('rend').value.trim(),temps:$('temps').value.trim(),type:$('type').value.trim()||'Dessert',sucre:$('sucre').value.trim(),
    ingredientsAdultes:linesOf($('ing').value),etapes:linesOf($('etp').value),conseils:linesOf($('cns').value)};
  const por=[...document.querySelectorAll(`#${px}-por .por`)].map(r=>({nom:r.querySelector('.pn').value.trim(),g:Math.max(0,Math.round(+r.querySelector('.pg').value||0)),cat:r.querySelector('.pc').value})).filter(x=>x.nom&&x.g>0);
  const prev={};(m.courses||[]).forEach(c=>prev[norm(c.nom)]=c.rayon);
  const courses=linesOf($('crs').value).map(l=>{const [n,...q]=l.split('|');const nom=n.trim();return {nom,quantite:q.join('|').trim(),rayon:prev[norm(nom)]||''}}).filter(c=>c.nom);
  const etapes=linesOf($('etp').value);let eb=+$('eb').value;if(eb>=etapes.length)eb=-1;
  return {titre:$('titre').value.trim()||'Repas sans titre',bebe:$('bebe').value.trim(),temps:$('temps').value.trim(),portionBebe:por,
    ingredientsAdultes:linesOf($('ing').value),etapes,etapeBebe:eb,courses,conseils:linesOf($('cns').value),kind:/soupe|veloute|potage|bouillon/.test(norm($('titre').value))?'bowl':(m.kind||'plate')}}
function bindEditor(px){
  const box=document.querySelector(`[data-ed="${px}"]`);if(!box||!document.getElementById(px+'-por'))return;
  const list=document.getElementById(px+'-por'),tot=document.getElementById(px+'-tot');
  const upd=()=>{const t=[...list.querySelectorAll('.pg')].reduce((s,i)=>s+(+i.value||0),0);tot.textContent=t===200?'Total 200 g':`Total ${t} g · visez 200 g`;tot.classList.toggle('bad',t!==200)};
  const wire=()=>{list.querySelectorAll('[data-rmpor]').forEach(b=>b.onclick=()=>{b.closest('.por').remove();upd()});list.querySelectorAll('.pg').forEach(i=>i.oninput=upd)};
  box.querySelector('[data-addpor]').onclick=()=>{list.insertAdjacentHTML('beforeend',porRow({nom:'',g:0,cat:'leg'}));wire();upd();list.lastElementChild.querySelector('.pn').focus()};
  box.querySelector('[data-fit]').onclick=()=>{const rows=[...list.querySelectorAll('.por')],v=rows.map(r=>+r.querySelector('.pg').value||0),cat=rows.map(r=>r.querySelector('.pc').value);
    let adj=rows.map((r,k)=>cat[k]==='leg'||cat[k]==='fec');const fixed=v.reduce((a,x,k)=>a+(adj[k]?0:x),0);let free=v.reduce((a,x,k)=>a+(adj[k]?x:0),0);
    if(!free||fixed>=200){adj=adj.map(()=>true);free=v.reduce((a,b)=>a+b,0)}if(!free)return;const target=adj.every(Boolean)?200:200-fixed;
    const n=v.map((x,k)=>adj[k]?Math.round(x*target/free):x);const d=200-n.reduce((a,b)=>a+b,0);let big=-1;n.forEach((x,k)=>{if(adj[k]&&(big<0||x>n[big]))big=k});n[big]+=d;
    rows.forEach((r,k)=>r.querySelector('.pg').value=n[k]);upd()};
  const etp=document.getElementById(px+'-etp'),eb=document.getElementById(px+'-eb');
  etp.addEventListener('change',()=>{const n=linesOf(etp.value).length,cur=+eb.value;eb.innerHTML=stepOpts(n,cur<n?cur:-1)});
  wire();upd()}

/* ---------- Import ---------- */
function renderImport(){
  const prevText=document.getElementById('importText')?.value||state.draft||'';
  main.innerHTML=`<div style="height:14px"></div><div class="imp">
   <div class="panel"><div><h3 style="font-size:1.25rem">Ajouter un menu ou une recette</h3><p class="muted" style="margin:4px 0 0">Photographiez une recette, ou collez du texte, ou déposez un fichier, puis chargez.</p></div>
    <button class="btn primary cam" id="camBtn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/></svg>${state.files.some(f=>f.type.startsWith('image/'))?'Ajouter une page':'Photographier une recette'}</button>
    ${state.importHint==='sucre'?'<div class="note" style="margin:0">Destination : <b>Plaisir sucré</b>. Les recettes lues y seront rangées, sans date.</div>':''}
    <div class="thumbs" id="thumbs"></div>
    <div class="or">ou</div>
    <div class="drop" id="drop" tabindex="0" role="button" aria-label="Déposer ou choisir des fichiers"><b>Déposez vos fichiers ici</b><span class="muted">ou touchez pour choisir · .txt, .md, .docx, .pdf, photo</span></div>
    <div class="files" id="files"></div>
    <label for="importText" class="eyebrow">Ou collez le texte</label>
    <textarea id="importText" placeholder="Lundi&#10;Midi : Lasagnes de potimarron | Bébé : potimarron + pâtes très cuites&#10;Soir : Velouté de carottes&#10;&#10;… ou une recette complète avec ses ingrédients et sa préparation.">${esc(prevText)}</textarea>
    <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><button class="btn primary" id="loadBtn" ${state.busy?'disabled':''}>Charger</button><button class="btn ghost" id="clearBtn">Effacer</button></div>
    <div class="status" id="status"></div></div>
   <div class="panel howto"><h3 style="font-size:1.1rem;color:var(--ink)">Comment c'est placé</h3>
    <ul><li>Si le texte nomme les jours (<code>Lundi</code>, <code>Mardi</code>…), on vous demande seulement <b>la semaine</b>.</li>
    <li>Sinon, on vous demande <b>la date</b> et <b>midi ou soir</b> pour chaque recette.</li>
    <li>Pour la portion de Johan, la répartition des 200 g est calculée : 20 g de protéines le midi, 10 g le soir, le reste en légumes et féculents.</li>
    <li><b>Photo d'une recette</b> (livre, fiche, écran, note manuscrite) : une page par photo, dans l'ordre, bien à plat et nette. La fiche est remplie puis s'ouvre pour vérification avant l'ajout.</li>
    <li>Quand l'analyse par Claude est disponible, elle complète aussi la portion de Johan et la liste de courses. Sinon, l'appli lit le texte elle-même.</li>
    <li>Un fichier JSON au format de l'appli (clé <code>repas</code>) est importé tel quel, avec portions, étapes et courses.</li>
    <li>Un repas importé remplace celui déjà prévu sur le même créneau. Il se retire depuis sa fiche recette.</li></ul></div></div>
   <div id="pending"></div>`;
  renderFiles();renderPending();bindImport()}
const thumbURL=new WeakMap();
function renderFiles(){const el=document.getElementById('files'),th=document.getElementById('thumbs');if(!el)return;
  const imgs=state.files.map((f,i)=>[f,i]).filter(([f])=>f.type.startsWith('image/')),docs=state.files.map((f,i)=>[f,i]).filter(([f])=>!f.type.startsWith('image/'));
  el.innerHTML=docs.map(([f,i])=>`<span class="file"><span>${esc(f.name)}</span><button aria-label="Retirer ${esc(f.name)}" data-rmf="${i}">×</button></span>`).join('');
  if(th)th.innerHTML=imgs.map(([f,i],k)=>{let u=thumbURL.get(f);if(!u){try{u=URL.createObjectURL(f);thumbURL.set(f,u)}catch(e){u=''}}
    return `<div class="thumb"><img src="${u}" alt="Page ${k+1} de la recette"><span>p. ${k+1}</span><button aria-label="Retirer la page ${k+1}" data-rmf="${i}">×</button></div>`}).join('');
  const cam=document.getElementById('camBtn');if(cam)cam.lastChild.textContent=imgs.length?'Ajouter une page':'Photographier une recette';
  document.querySelectorAll('[data-rmf]').forEach(b=>b.onclick=()=>{state.files.splice(+b.dataset.rmf,1);renderFiles()});
  const lb=document.getElementById('loadBtn');if(lb)lb.textContent=imgs.length&&!docs.length&&!(document.getElementById('importText')?.value.trim())?'Lire la recette':'Charger'}
function setStatus(msg,err,spin){const el=document.getElementById('status');if(!el)return;el.className='status'+(err?' err':'');el.innerHTML=(spin?'<span class="spin"></span>':'')+esc(msg)}
function addFiles(list){for(const f of list)state.files.push(f);renderFiles()}
function bindImport(){
  const drop=document.getElementById('drop'),fi=document.getElementById('fileInput'),ta=document.getElementById('importText');
  drop.onclick=()=>fi.click();drop.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}};
  fi.onchange=()=>{addFiles(fi.files);fi.value=''};
  const ci=document.getElementById('camInput');document.getElementById('camBtn').onclick=()=>ci.click();ci.onchange=()=>{addFiles(ci.files);ci.value='';setStatus(state.files.filter(f=>f.type.startsWith('image/')).length+' page(s) prête(s). Ajoutez une autre page si la recette continue, puis « Lire la recette ».')};
  ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over')}));
  drop.addEventListener('drop',e=>{const dt=e.dataTransfer;if(dt.files&&dt.files.length)addFiles(dt.files);else{const t=dt.getData('text');if(t){ta.value+=(ta.value?'\n':'')+t;state.draft=ta.value}}});
  ta.addEventListener('input',()=>{state.draft=ta.value;renderFiles()});
  ta.addEventListener('paste',e=>{const imgs=[...(e.clipboardData?.files||[])].filter(f=>f.type.startsWith('image/'));if(imgs.length){e.preventDefault();addFiles(imgs.map((f,i)=>new File([f],f.name&&f.name!=='image.png'?f.name:`photo-collée-${Date.now()}-${i}.png`,{type:f.type})))}});
  document.getElementById('clearBtn').onclick=()=>{ta.value='';state.draft='';state.files=[];state.pending=null;renderFiles();renderPending();setStatus('')};
  document.getElementById('loadBtn').onclick=analyze}
const loaded={};
function loadScript(src){return loaded[src]||(loaded[src]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>rej(new Error('script'));document.head.appendChild(s)}))}
async function fileText(f){
  const n=f.name.toLowerCase();
  if(n.endsWith('.docx')){await loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js');const r=await mammoth.extractRawText({arrayBuffer:await f.arrayBuffer()});return r.value}
  if(n.endsWith('.pdf')){const base='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';await loadScript(base+'pdf.min.js');await loadScript(base+'pdf.worker.min.js');
    pdfjsLib.GlobalWorkerOptions.workerSrc=base+'pdf.worker.min.js';
    const pdf=await pdfjsLib.getDocument({data:new Uint8Array(await f.arrayBuffer()),disableWorker:true}).promise;let out='';
    for(let p=1;p<=pdf.numPages;p++){const pg=await pdf.getPage(p),tc=await pg.getTextContent();let lastY=null;
      tc.items.forEach(it=>{const y=it.transform[5];if(lastY!==null&&Math.abs(y-lastY)>2)out+='\n';out+=it.str;lastY=y});out+='\n'}
    return out}
  let t=await f.text();if(/\.html?$/.test(n))t=new DOMParser().parseFromString(t,'text/html').body.innerText;return t}

const DAY_N=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
async function analyze(){
  const ta=document.getElementById('importText');let text=ta.value.trim();const imgs=state.files.filter(f=>f.type.startsWith('image/'));
  if(!text&&!state.files.length){setStatus('Collez un texte ou déposez un fichier avant de charger.',true);return}
  state.busy=true;document.getElementById('loadBtn').disabled=true;setStatus('Lecture des fichiers…',false,true);
  try{
    for(const f of state.files.filter(f=>!f.type.startsWith('image/'))){try{text+='\n\n'+(await fileText(f))}catch(e){setStatus(`Impossible de lire ${f.name}. Copiez son contenu dans la zone de texte.`,true);state.busy=false;document.getElementById('loadBtn').disabled=false;return}}
    text=text.trim();let meals=null,via='',preWeek=null;
    const js=tryJSON(text);
    if(js){meals=js.repas;via='fichier';if(/^\d{4}-\d{2}-\d{2}$/.test(String(js.semaine||'')))preWeek=mondayOf(js.semaine)}
    const sample=!meals&&window.claude&&claude.use?await claude.use('sample').catch(()=>null):null;
    if(sample){
      try{let lim=null,send=[];
        if(imgs.length){lim=await sample.limits().catch(()=>null);
          if(lim&&lim.images){setStatus('Préparation des photos…',false,true);send=[];for(const f of imgs.slice(0,lim.images.maxCount||4))send.push(await prepImage(f,lim.images))}
          if(imgs.length>(lim?.images?.maxCount||4))setStatus(`Seules les ${lim?.images?.maxCount||4} premières pages sont lues.`,true)}
        setStatus(send.length?`Lecture de ${send.length>1?send.length+' pages':'la photo'} par Claude… (20 à 40 s)`:'Analyse par Claude…',false,true);
        const res=await sample.json(aiPrompt(text,send.length),{modelTier:send.length?'complex':'default',images:send.length?send:undefined});
        if(res&&Array.isArray(res.repas)&&res.repas.length){meals=res.repas;via=send.length?'photo':'Claude'}
      }catch(e){const c=e&&e.code;
        if(c==='rate_limited')setStatus('Trop de demandes pour le moment, analyse locale à la place.',true);
        else if(c==='image_rejected')setStatus("Une photo n'a pas pu être lue (format ou taille). Reprenez-la en JPEG.",true)}
    }
    if(!meals&&imgs.length&&!(window.claude&&claude.use)){
      try{text=(text+'\n\n'+(await ocrLocal(imgs))).trim()}catch(e){setStatus("La lecture des photos a échoué. Collez le texte de la recette.",true);return}}
    if(!meals){
      if(!text){setStatus("La lecture des photos n'est pas disponible ici. Collez le texte de la recette.",true);return}
      meals=localParse(text);via=via||'appli'}
    if(!meals.length){setStatus("Aucun repas reconnu. Mettez un titre de plat par ligne, ou les jours suivis de Midi : / Soir :.",true);return}
    meals=meals.map(cleanMeal);
    const hasDays=meals.some(m=>m.jour!==null);
    const nextMon=addDays(mondayOf(TODAY),7);
    state.pending={meals,hasDays,week:hasDays?(preWeek||(weekHasMeals(nextMon)&&!weekHasMeals(addDays(nextMon,7))?addDays(nextMon,7):nextMon)):null,via};
    meals.forEach(m=>{m.inc=true;m.slotSel=state.importHint==='sucre'||m.dessert?'sucre':(m.creneau||'midi');m.dateSel='';m.open=meals.length<=2&&(via==='photo'||imgs.length>0||!m.jour&&meals.length===1)});
    setStatus(`${meals.length} repas reconnu${meals.length>1?'s':''} (${via==='fichier'?'fichier structuré':via==='photo'?'photo lue par Claude':via==='Claude'?'analyse par Claude':"analyse par l'appli"}).${meals.some(m=>m.open)?' Vérifiez la fiche, corrigez si besoin, puis ajoutez-la.':''}`);
    renderPending();document.getElementById('pending')?.scrollIntoView({behavior:'smooth',block:'start'});
  }finally{state.busy=false;const b=document.getElementById('loadBtn');if(b)b.disabled=false}}
async function prepImage(f,lim){
  const okType=(lim.mediaTypes||['image/jpeg','image/png','image/webp']).includes(f.type);
  if(okType&&f.size<=(lim.maxInputBytes||2e7)&&f.size<=8e6)return f;
  try{const bmp=await createImageBitmap(f);const sc=Math.min(1,2400/Math.max(bmp.width,bmp.height));
    const c=document.createElement('canvas');c.width=Math.round(bmp.width*sc);c.height=Math.round(bmp.height*sc);c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
    return await new Promise(r=>c.toBlob(b=>r(b||f),'image/jpeg',.9))}catch(e){return f}}
async function ocrLocal(imgs){
  await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js');
  setStatus('Lecture des photos sur l\'appareil… (premier usage : environ 30 s)',false,true);
  const w=await Tesseract.createWorker('fra');let out='';
  try{for(let i=0;i<imgs.length;i++){setStatus(`Lecture de la page ${i+1} / ${imgs.length}…`,false,true);out+=(await w.recognize(imgs[i])).data.text+'\n'}}finally{await w.terminate()}
  return out}
function tryJSON(t){const s=String(t||'').replace(/```(?:json)?/gi,'');const a=s.indexOf('{'),b=s.lastIndexOf('}');if(a<0||b<=a)return null;
  try{const o=JSON.parse(s.slice(a,b+1));if(o&&Array.isArray(o.repas)&&o.repas.length)return o}catch(e){}return null}
function aiPrompt(text,nImg){const photo=nImg?`Les ${nImg>1?nImg+' photos jointes sont les pages successives d\'une même recette, dans l\'ordre':'photo jointe montre une recette'} (page de livre, fiche, écran ou note manuscrite).
LECTURE DES PHOTOS — priorité à la fidélité :
- Lis TOUT le texte visible : titre, nombre de personnes, ingrédients avec leurs quantités et unités exactes, toutes les étapes dans l'ordre, temps de préparation et de cuisson, températures.
- Garde le titre et la formulation des étapes de la recette. N'invente aucun ingrédient. Si un mot est illisible, mets ta meilleure lecture suivie de (?).
- Ignore les textes sans rapport (autres recettes de la page, publicités, numéros de page).
- Adapte les quantités pour 2 adultes + la portion de Johan (environ 2,5 parts) en gardant les proportions, et dis-le dans "note", par exemple « Recette d'origine pour 6 personnes, quantités adaptées ». Si le nombre de personnes n'est pas indiqué, garde les quantités telles quelles et dis-le dans "note".
- Ajoute l'étape du prélèvement de la portion de Johan au bon moment (avant sel, alcool, épices fortes), et renseigne etapeBebe.
- Mets "recetteFournie": true.
`:'';
return `${photo}Tu analyses ${nImg?'ces photos'+(text?' et le texte ci-dessous':''):'un texte collé'} dans une appli de menus familiaux : 2 adultes et Johan, un bébé de 13 mois. Chaque repas de Johan pèse exactement 200 g, prélevé avant l'assaisonnement des adultes. Saison : automne.
Réponds UNIQUEMENT avec un objet JSON de cette forme :
{"repas":[{"jour":"lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche" ou null si le jour n'est PAS écrit dans le texte,
"creneau":"midi"|"soir"|null si non précisé,
"titre":"plat des adultes, tel qu'écrit",
"bebe":"déclinaison pour Johan (reprends celle du texte si elle existe, sinon propose-la)",
"temps":"durée totale, ex. 35 min",
"ingredientsAdultes":["quantité + ingrédient pour 2 adultes, en précisant (dont X g pour Johan)"],
"portionBebe":[{"nom":"ingrédient","g":nombre,"cat":"leg|fec|pro|lait|gras"}],
"courses":[{"nom":"ingrédient","quantite":"quantité totale à acheter","rayon":"Fruits & Légumes|Boucherie & Poissonnerie|Crémerie & Frais|Épicerie & Pains"}],
"etapes":["étape"],
"etapeBebe":index (à partir de 0) de l'étape où l'on prélève la portion de Johan,
"conseils":["conseil de texture ou de sécurité pour Johan"],
"recetteFournie":true si le texte contenait la recette, false si tu l'as proposée,
"note":"remarque courte sur l'adaptation des quantités, ou chaîne vide",
"dessert":true si c'est un dessert, un goûter ou une recette sucrée (sinon false),
"type":"Compote|Goûter|Dessert (desserts seulement)","rendement":"quantité obtenue, ex. 12 mini-muffins (desserts seulement)","sucre":"Sans sucre ajouté, ou la quantité de sucre restante (desserts seulement)"}]}
Pour un dessert ou un goûter : propose une version adaptée à Johan sans sucre ajouté (douceur des fruits mûrs, vanille en gousse, cannelle), sans miel ni sirop ; si tu retires ou réduis du sucre de la recette d'origine, dis-le dans "note". portionBebe et courses peuvent être vides pour un dessert.
Règles : n'invente jamais de jour. Un objet par repas. La somme des g de portionBebe vaut 200. Protéines animales : 20 g max le midi, 10 g max le soir (¼ d'œuf ≈ 12 g). Aucun sel, miel, alcool ni lait cru dans la portion de Johan ; œufs et viandes cuits à cœur. Si la recette est donnée, garde ses quantités et ses étapes. Réponds en français.

TEXTE :
${text||'(aucun texte, voir les photos)'}`}
function cleanMeal(m){
  const j=norm(m.jour||'').trim(),c=norm(m.creneau||'').trim();
  return {jour:DAY_N.includes(j)?DAY_N.indexOf(j):null,creneau:c==='midi'||c==='soir'?c:null,
    titre:String(m.titre||'Repas sans titre').slice(0,160),bebe:String(m.bebe||'').slice(0,200),temps:String(m.temps||'').slice(0,40),
    ingredientsAdultes:(m.ingredientsAdultes||[]).map(String).slice(0,40),portionBebe:Array.isArray(m.portionBebe)?m.portionBebe.slice(0,10):null,
    courses:(m.courses||[]).filter(x=>x&&x.nom).slice(0,40).map(x=>({nom:String(x.nom),quantite:String(x.quantite||''),rayon:String(x.rayon||'')})),
    etapes:(m.etapes||[]).map(String).slice(0,20),etapeBebe:Number.isInteger(m.etapeBebe)?m.etapeBebe:-1,conseils:(m.conseils||[]).map(String).slice(0,8),
    recetteFournie:m.recetteFournie!==false,note:String(m.note||'').slice(0,200),dessert:m.dessert===true,type:String(m.type||'').slice(0,30),rendement:String(m.rendement||'').slice(0,60),sucre:String(m.sucre||'').slice(0,80),kind:/soupe|veloute|potage|bouillon/.test(norm(m.titre))?'bowl':'plate'}}

/* Analyse locale (sans Claude) */
function localParse(text){
  const lines=text.split(/\r?\n/);
  const strip=l=>l.replace(/^[\s#>*\-•–—·]+/,'').replace(/^\d+[.)]\s+/,'').replace(/\*\*|__/g,'').replace(/(^|\s)\*(?=\S)|(?<=\S)\*(?=\s|$|:)/g,'$1').trim();
  const dayRe=/^(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b\s*[:\-–—]?\s*/;
  const anyDay=lines.some(l=>dayRe.test(norm(strip(l))));
  return anyDay?parseMenu(lines,strip,dayRe):parseRecipes(lines,strip)}
function splitBaby(s){const m=s.split(/\s*[|]\s*|\s+[–—-]\s+(?=(?:\*?\s*)(?:b[ée]b[ée]|johan))/i);let adult=m[0],baby='';
  if(m.length>1)baby=m.slice(1).join(' ');baby=baby.replace(/^\*?\s*(b[ée]b[ée]|johan)\s*\*?\s*[:：]?\s*/i,'').replace(/\(\s*200\s*g\s*\)/i,'').replace(/\*/g,'').trim();
  return {titre:adult.replace(/\*/g,'').trim(),bebe:baby}}
function parseMenu(lines,strip,dayRe){
  const out=[];let day=null,last=null;
  const slotRe=/^(midi|dejeuner|soir|diner)\b\s*[:\-–—]?\s*/;
  const babyRe=/^(bebe|johan)\b\s*[:\-–—]?\s*/;
  const add=(content,slot)=>{if(!content)return;const {titre,bebe}=splitBaby(content);if(!titre)return;
    if(!slot){const taken=out.filter(o=>o.jour===DAY_N[day]).map(o=>o.creneau);slot=taken.includes('midi')?(taken.includes('soir')?null:'soir'):'midi'}
    last={jour:day===null?null:DAY_N[day],creneau:slot,titre,bebe};out.push(last)};
  for(const raw of lines){const c=strip(raw);if(!c)continue;const n=norm(c);let m;
    if((m=n.match(dayRe))){day=DAY_N.indexOf(m[1]);last=null;const rest=c.slice(m[0].length).trim();if(rest){const ms=norm(rest).match(slotRe);ms?add(rest.slice(ms[0].length),ms[1]==='midi'||ms[1]==='dejeuner'?'midi':'soir'):add(rest,null)}continue}
    if((m=n.match(slotRe))){const slot=m[1]==='midi'||m[1]==='dejeuner'?'midi':'soir';add(c.slice(m[0].length),slot);continue}
    if((m=n.match(babyRe))&&last){last.bebe=c.slice(m[0].length).replace(/\(\s*200\s*g\s*\)/i,'').replace(/\*/g,'').trim();continue}
    if(day!==null&&c.length<160)add(c,null)}
  return out}
function parseRecipes(lines,strip){
  const L=lines.map(l=>l.trim());const ingIdx=L.map((l,i)=>/^ingr[ée]dient/.test(norm(strip(l)))?i:-1).filter(i=>i>=0);
  const bounds=[0];ingIdx.slice(1).forEach(k=>{let t=k-1;while(t>0&&!L[t])t--;if(t>bounds[bounds.length-1])bounds.push(t)});
  const blocks=bounds.map((b,i)=>L.slice(b,bounds[i+1]??L.length));
  return blocks.map(b=>parseRecipe(b,strip)).filter(Boolean)}
function parseRecipe(lines,strip){
  let title='',sec='none',bebe='',temps='';const ing=[],steps=[],tips=[],loose=[];let eb=-1;
  for(const raw of lines){if(!raw)continue;const c=strip(raw);if(!c)continue;const n=norm(c);
    const head=n.replace(/[:\s]+$/,'');
    if(/^ingredients?\b/.test(head)&&head.length<40){sec='ing';continue}
    if(/^(preparation|etapes?|instructions?|deroule|methode)\b/.test(head)&&head.length<40&&!/^\d/.test(n)){sec='steps';continue}
    if(/^(conseils?|astuces?|securite|texture)/.test(head)&&head.length<50){sec='tips';continue}
    if(/^(bebe|johan|portion bebe|version bebe)\b/.test(n)){const rest=c.replace(/^[^:：]*[:：]\s*/,'');if(rest&&rest!==c){bebe=rest.replace(/\(\s*200\s*g\s*\)/i,'').trim()}else sec='tips';continue}
    const tm=n.match(/(temps|cuisson|duree|total)[^:]*:\s*(.+)/);if(tm&&!temps){temps=c.slice(c.indexOf(':')+1).trim().slice(0,40);continue}
    if(!title){title=c.replace(/[:：]\s*$/,'');continue}
    if(sec==='ing')ing.push(c);else if(sec==='steps')steps.push(c.replace(/^(etape|étape)\s*\d+\s*[:.)-]?\s*/i,''));else if(sec==='tips')tips.push(c);else loose.push(c)}
  if(!ing.length&&!steps.length)loose.forEach(c=>(/^[\d½¼¾]/.test(c)&&c.length<80?ing:steps).push(c));
  else steps.push(...loose);
  steps.forEach((s,i)=>{if(eb<0&&/bebe|johan|reserv|prelev/.test(norm(s)))eb=i});
  if(!title)return null;
  const courses=ing.map(s=>{const m=s.match(/^([\d.,/½¼¾\s]+(?:kg|g|ml|cl|l|c\.?\s*à\s*(?:soupe|café)|cuill[eè]res?(?:\s*à\s*(?:soupe|café))?|tranches?|pinc[ée]es?|gousses?|bottes?)?\.?)\s*(?:d['’]\s*|de\s+|des\s+|du\s+)?(.*)$/i);
    return m&&m[2]?{nom:m[2].replace(/\(.*?\)/g,'').trim(),quantite:m[1].trim(),rayon:''}:{nom:s,quantite:'',rayon:''}});
  return {jour:null,creneau:null,titre:title,bebe,temps,ingredientsAdultes:ing,portionBebe:null,courses,etapes:steps,etapeBebe:eb,conseils:tips,recetteFournie:true}}

function targetOf(m,p){if(m.slotSel==='sucre'&&m.jour===null)return {date:null,slot:'sucre'};if(m.jour!==null&&p.week)return {date:addDays(p.week,m.jour),slot:m.creneau||m.slotSel};return {date:m.dateSel,slot:m.slotSel}}
function renderPendingRaw(){const p=state.pending;if(p)p._skipSync=true;renderPending();if(p)p._skipSync=false}
function syncEditors(){if(state.pending&&state.pending._skipSync)return;const p=state.pending;if(!p)return;p.meals.forEach((m,i)=>{if(m.open&&document.getElementById('pe'+i+'-titre'))Object.assign(m,readEditor('pe'+i,m))})}
function renderPending(){
  const el=document.getElementById('pending');if(!el)return;syncEditors();const p=state.pending;if(!p){el.innerHTML='';return}
  let h=`<section class="place"><div><span class="eyebrow">Étape 2</span><h3>Placer dans le calendrier</h3></div>`;
  if(p.hasDays){const cur=mondayOf(TODAY);
    h+=`<div><p style="margin:0 0 8px">Les jours sont nommés dans le texte. <b>Pour quelle semaine est ce menu ?</b></p><div class="weeks">`;
    for(let i=0;i<6;i++){const w=addDays(cur,7*i);h+=`<button class="chip" data-pw="${w}" aria-pressed="${p.week===w}">${i===0?'Cette semaine':i===1?'Semaine prochaine':'Sem. du '+fmtDay(w)}</button>`}
    h+=`<label class="muted" for="pWeekDate" style="font-size:.85rem">ou une date :</label><input type="date" id="pWeekDate" value="${p.week||''}"></div>
      ${p.week?`<p class="muted" style="margin:8px 0 0">Semaine ${weekLabel(p.week)}${weekHasMeals(p.week)?' · des repas y sont déjà prévus':''}</p>`:''}</div>`}
  const needs=p.meals.some(m=>m.jour===null);
  if(needs)h+=`<p style="margin:0"><b>${p.hasDays?'Ces repas n\'ont pas de jour :':'Le texte ne nomme pas de jour.'}</b> Choisissez la date et le créneau de ${p.meals.filter(m=>m.jour===null).length>1?'chaque recette':'la recette'}.</p>`;
  h+='<div>';
  p.meals.forEach((m,i)=>{const tg=targetOf(m,p),ex=tg.date&&tg.slot?getMeal(tg.date,tg.slot):null;
    h+=`<div class="prow"><input type="checkbox" id="pInc${i}" data-pi="${i}" ${m.inc?'checked':''} aria-label="Ajouter ${esc(m.titre)}">
     <div style="min-width:0"><div class="tt">${esc(m.titre)}</div>${m.bebe?`<div class="bb">Johan : ${esc(m.bebe)}</div>`:''}</div><div class="where">`;
    if(m.jour!==null)h+=`<span class="pill">${JOURS[m.jour]}${tg.date?' '+fmtDay(tg.date):''}</span>`;
    else if(m.slotSel!=='sucre')h+=`<input type="date" id="pDate${i}" data-pd="${i}" value="${m.dateSel}" aria-label="Date pour ${esc(m.titre)}">`;
    if(m.creneau&&m.jour!==null)h+=`<span class="pill ${m.creneau}">${m.creneau}</span>`;
    else h+=`<select id="pSlot${i}" data-ps="${i}" aria-label="Créneau"><option value="midi" ${m.slotSel==='midi'?'selected':''}>Midi</option><option value="soir" ${m.slotSel==='soir'?'selected':''}>Soir</option>${m.jour===null?`<option value="sucre" ${m.slotSel==='sucre'?'selected':''}>Plaisir sucré (sans date)</option>`:''}</select>`;
    h+='</div>';
    if(m.inc&&ex&&tg.date)h+=`<div class="warn">Remplace « ${esc(ex.titre)} » du ${fmtLong(tg.date)} ${tg.slot}</div>`;
    h+=`<div style="grid-column:2/-1"><button type="button" class="btn small" data-popen="${i}">${m.open?'Replier la fiche':'Vérifier et modifier la fiche'}</button></div>`;
    if(m.open)h+=editorHTML(m,'pe'+i,{sweet:m.slotSel==='sucre'});
    h+='</div>'});
  const ready=p.meals.some(m=>m.inc)&&p.meals.every(m=>!m.inc||(m.jour!==null?!!p.week:(m.slotSel==='sucre'||!!m.dateSel)));
  h+=`</div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" id="pSave" ${ready?'':'disabled'}>Ajouter au calendrier</button><button class="btn ghost" id="pCancel">Annuler</button></div></section>`;
  el.innerHTML=h;
  el.querySelectorAll('[data-pw]').forEach(b=>b.onclick=()=>{p.week=b.dataset.pw;renderPending()});
  const wd=el.querySelector('#pWeekDate');if(wd)wd.onchange=()=>{if(wd.value){p.week=mondayOf(wd.value);renderPending()}};
  el.querySelectorAll('[data-pi]').forEach(x=>x.onchange=()=>{p.meals[+x.dataset.pi].inc=x.checked;renderPending()});
  el.querySelectorAll('[data-pd]').forEach(x=>x.onchange=()=>{p.meals[+x.dataset.pd].dateSel=x.value;renderPending()});
  el.querySelectorAll('[data-ps]').forEach(x=>x.onchange=()=>{syncEditors();const m=p.meals[+x.dataset.ps],was=m.slotSel;m.slotSel=x.value;if((was==='sucre')!==(x.value==='sucre'))m.open=m.open;renderPendingRaw()});
  el.querySelectorAll('[data-popen]').forEach(b=>b.onclick=()=>{const m=p.meals[+b.dataset.popen];syncEditors();m.open=!m.open;renderPending()});
  p.meals.forEach((m,i)=>{if(m.open)bindEditor('pe'+i)});
  el.querySelector('#pCancel').onclick=()=>{state.pending=null;renderPending()};
  el.querySelector('#pSave').onclick=commitPending}
async function commitPending(){
  syncEditors();const p=state.pending;const btn=document.getElementById('pSave');btn.disabled=true;btn.textContent='Ajout…';
  const seen=new Set();let n=0,first=null;
  let ns=0;
  for(const m of p.meals){if(!m.inc)continue;const tg=targetOf(m,p);
    if(tg.slot==='sucre'){saveSweet({titre:m.titre,type:m.type||'Dessert',temps:m.temps||'',rendement:m.rendement||'',sucre:m.sucre||'Sans sucre ajouté',ingredientsAdultes:m.ingredientsAdultes||[],etapes:m.etapes||[],conseils:m.conseils||[],note:m.note||'',kind:/compote|creme|puree|riz au lait|yaourt/.test(norm(m.titre))?'bowl':'plate',source:p.via||'',addedAt:new Date().toISOString()});ns++;continue}
    if(!tg.date||!tg.slot)continue;const key=tg.date+'_'+tg.slot;if(seen.has(key))continue;seen.add(key);
    const rec={date:tg.date,slot:tg.slot,titre:m.titre,bebe:m.bebe,temps:m.temps,kind:m.kind,ingredientsAdultes:m.ingredientsAdultes,portionBebe:m.portionBebe&&m.portionBebe.length?m.portionBebe:guessPortion(m.bebe,tg.slot),note:m.note||'',
      courses:m.courses,etapes:m.etapes,etapeBebe:m.etapeBebe,conseils:m.conseils,recetteFournie:m.recetteFournie,source:p.via||'',addedAt:new Date().toISOString()};
    await saveMeal(rec);n++;if(!first||tg.date<first)first=tg.date}
  state.pending=null;state.files=[];state.draft='';
  if(first){state.week=mondayOf(first);state.dayFilter=null}
  if(ns&&!n){setTab('sucre');toast(`${ns} recette${ns>1?'s':''} ajoutée${ns>1?'s':''} à Plaisir sucré`);return}
  setTab('calendrier');toast(`${n} repas ajouté${n>1?'s':''} · semaine ${weekLabel(state.week)}${ns?` · ${ns} dans Plaisir sucré`:''}`)}

/* ---------- Événements communs ---------- */
function bind(){
  main.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setTab(b.dataset.go));
  main.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{const id=b.dataset.open,d=id.split('_')[0];state.dayFilter=dayIdx(d);setTab('recettes');
    requestAnimationFrame(()=>document.getElementById('r-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}))});
  main.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{const v=b.dataset.day;state.dayFilter=v==='all'?'all':+v;render()});
  main.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{const back=!!BASE[b.dataset.del];if(b.dataset.confirm){deleteMeal(b.dataset.del);toast(back?'Fiche d\'origine rétablie':'Repas retiré du calendrier')}else{b.dataset.confirm='1';b.textContent='Confirmer';setTimeout(()=>{if(b.isConnected){delete b.dataset.confirm;b.textContent=b.dataset.lbl}},4000)}});
  main.querySelectorAll('[data-cook]').forEach(b=>b.onclick=()=>openCook('meal',b.dataset.cook));
  main.querySelectorAll('[data-star]').forEach(b=>b.onclick=()=>{const v=setRating(b.dataset.rk,b.dataset.rid,+b.dataset.star);rerender();
    toast(v?`Noté ${v} étoile${v>1?'s':''} · ajouté à la Bibliothèque`:'Note retirée')});
  main.querySelectorAll('[data-tgo2]').forEach(b=>b.onclick=()=>startTimer(+b.dataset.tgo2,b.dataset.tl));
  main.querySelectorAll('[data-lk]').forEach(b=>b.onclick=()=>{state.libKind=b.dataset.lk;rerender()});
  const ls=document.getElementById('libSort');if(ls)ls.onchange=()=>{state.libSort=ls.value;rerender()};
  const lm=document.getElementById('libMin');if(lm)lm.onchange=()=>{state.libMin=+lm.value;rerender()};
  main.querySelectorAll('[data-cookl]').forEach(b=>b.onclick=()=>openCook('lib',b.dataset.cookl));
  main.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{state.libPlan=b.dataset.plan;state.libDate='';state.libSlot='midi';rerender();requestAnimationFrame(()=>document.getElementById('planDate')?.focus())});
  main.querySelectorAll('[data-planx]').forEach(b=>b.onclick=()=>{state.libPlan=null;rerender()});
  const pd=document.getElementById('planDate'),ps=document.getElementById('planSlot');
  if(pd)pd.onchange=()=>{state.libDate=pd.value;rerender()};if(ps)ps.onchange=()=>{state.libSlot=ps.value;rerender()};
  main.querySelectorAll('[data-planf]').forEach(f=>f.onsubmit=async e=>{e.preventDefault();const id=f.dataset.planf,r=state.ratings[id],rec=libRecipe(id),d=state.libDate,sl=state.libSlot||'midi';if(!r||!rec||!d)return;
    await saveMeal(clean({...rec,titre:r.titre,date:d,slot:sl,base:false,fromLibrary:true,addedAt:new Date().toISOString()}));
    state.ratings[id]={...r,lastDate:d};if(state.db)queued('r'+id,()=>state.db.collection('ratings').doc(id).set(clean(state.ratings[id])));saveLocal();
    state.libPlan=null;state.week=mondayOf(d);state.dayFilter=null;setTab('calendrier');toast(`${r.titre.split(/[,&]/)[0]} ajouté : ${fmtLong(d).toLowerCase()} ${sl}`)});
  main.querySelectorAll('[data-cooks]').forEach(b=>b.onclick=()=>openCook('sweet',b.dataset.cooks));
  main.querySelectorAll('[data-swap]').forEach(b=>b.onclick=()=>{state.swap=state.swap?null:{src:null};rerender()});
  main.querySelectorAll('[data-sw]').forEach(b=>b.onclick=async()=>{const id=b.dataset.sw,sw=state.swap;if(!sw)return;
    if(!sw.src){const [d,s]=id.split('_');if(getMeal(d,s))sw.src=id;rerender();return}
    if(sw.src===id){sw.src=null;rerender();return}
    const r=await moveMeal(sw.src,id);state.swap={src:null};rerender();toast(r==='swap'?'Repas échangés':'Repas déplacé')});
  main.querySelectorAll('[data-restore]').forEach(b=>b.onclick=()=>{deleteMeal(b.dataset.restore);toast('Repas prévu rétabli')});
  const fx=document.getElementById('addx');if(fx)fx.onsubmit=e=>{e.preventDefault();const n=document.getElementById('xName').value.trim(),q=document.getElementById('xQty').value.trim();if(!n)return;
    addExtra(state.week,n,q);document.getElementById('xName').value='';document.getElementById('xQty').value='';rerender();document.getElementById('xName')?.focus();toast(n+' ajouté à la liste')};
  main.querySelectorAll('[data-xdel]').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();delExtra(b.dataset.xdel);rerender()});
  const cp=main.querySelector('[data-copy]');if(cp)cp.onclick=()=>{const t=listText(state.week);
    const fb=()=>{const box=document.getElementById('copybox');if(!box)return;box.innerHTML=`<textarea class="copyta" id="copyta" readonly rows="9" aria-label="Liste de courses en texte">${esc(t)}</textarea>`;const ta=document.getElementById('copyta');ta.focus();ta.select();toast('Texte sélectionné : copiez-le')};
    try{navigator.clipboard.writeText(t).then(()=>toast('Liste copiée : collez-la dans un message'),fb)}catch(e){fb()}};
  main.querySelectorAll('[data-ft]').forEach(x=>x.onchange=()=>{const id=x.dataset.ft,cur=state.foods[id]||{};
    setFood(id,x.checked?{nom:x.dataset.fn,cat:x.dataset.fc||catOf(x.dataset.fn),tasted:true,date:cur.date||TODAY,by:store.user?firstName(store.user):''}:{nom:x.dataset.fn,cat:x.dataset.fc||catOf(x.dataset.fn),tasted:false});rerender()});
  main.querySelectorAll('[data-fr]').forEach(b=>b.onclick=()=>{const id=b.dataset.fr,cur=state.foods[id]||{};setFood(id,{reaction:cur.reaction===b.dataset.rv?'':b.dataset.rv});rerender()});
  const ff=document.getElementById('addf');if(ff)ff.onsubmit=e=>{e.preventDefault();const n=document.getElementById('fName').value.trim();if(!n)return;
    setFood(foodId(n),{nom:canonFood(n),cat:catOf(n),tasted:true,date:TODAY,custom:true,by:store.user?firstName(store.user):''});document.getElementById('fName').value='';rerender();toast(canonFood(n)+' ajouté')};
  main.querySelectorAll('[data-sf]').forEach(b=>b.onclick=()=>{state.sweetFilter=b.dataset.sf;rerender()});
  main.querySelectorAll('[data-addsweet]').forEach(b=>b.onclick=()=>{setTab('importer');state.importHint='sucre';render()});
  main.querySelectorAll('[data-sedit]').forEach(b=>b.onclick=()=>{state.editing='S:'+b.dataset.sedit;rerender();requestAnimationFrame(()=>document.getElementById('s-'+b.dataset.sedit)?.scrollIntoView({behavior:'smooth',block:'start'}))});
  main.querySelectorAll('[data-ssave]').forEach(b=>b.onclick=()=>{const id=b.dataset.ssave,cur=allSweets()[id];if(!cur)return;const {base,orig,...rest}=cur;
    saveSweet({...rest,...readEditor('se',cur),id,editedAt:new Date().toISOString()});state.editing=null;rerender();toast('Recette enregistrée')});
  main.querySelectorAll('[data-sdel]').forEach(b=>b.onclick=()=>{if(b.dataset.confirm){const o=allSweets()[b.dataset.sdel];deleteSweet(b.dataset.sdel);rerender();toast(o&&o.orig?'Recette d\'origine rétablie':'Recette supprimée')}
    else{b.dataset.confirm='1';b.textContent='Confirmer';setTimeout(()=>{if(b.isConnected){delete b.dataset.confirm;b.textContent=b.dataset.lbl}},4000)}});
  main.querySelectorAll('[data-sadd]').forEach(b=>b.onclick=()=>{const sw=allSweets()[b.dataset.sadd];if(!sw)return;const w=mondayOf(TODAY);let n=0;
    (sw.ingredientsAdultes||[]).forEach(l=>{const c=ingToCourse(l);if(c.nom){addExtra(w,c.nom,c.quantite);n++}});toast(`${n} ingrédient${n>1?'s':''} ajouté${n>1?'s':''} aux courses de cette semaine`)});
  main.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{state.editing=b.dataset.edit;rerender();requestAnimationFrame(()=>document.getElementById('r-'+state.editing)?.scrollIntoView({behavior:'smooth',block:'start'}))});
  if(state.editing&&document.querySelector('[data-ed="re"]'))bindEditor('re');
  main.querySelectorAll('[data-ecancel]').forEach(b=>b.onclick=()=>{state.editing=null;rerender()});
  main.querySelectorAll('[data-esave]').forEach(b=>b.onclick=async()=>{const id=b.dataset.esave,[date,slot]=id.split('_'),cur=getMeal(date,slot);if(!cur)return;
    const {_i,_id,...rest}=cur;const rec={...rest,...readEditor('re',cur),date,slot,base:false,modifie:true,editedAt:new Date().toISOString()};
    state.editing=null;await saveMeal(rec);rerender();toast('Fiche enregistrée')});
  main.querySelectorAll('[data-ck]').forEach(x=>x.onchange=()=>{setCheck(state.week,x.dataset.ck,x.checked);rerender()});
  const un=main.querySelector('[data-uncheck]');if(un)un.onclick=()=>{if(!un.dataset.confirm){un.dataset.confirm='1';un.textContent='Confirmer : tout décocher';setTimeout(()=>{if(un.isConnected){delete un.dataset.confirm;un.textContent='Tout décocher'}},4000);return}
    Object.keys(state.checks[state.week]||{}).forEach(k=>setCheck(state.week,k,false));rerender()};
}
const h0=(location.hash||'').slice(1);if(['calendrier','courses','recettes','biblio','sucre','johan','importer'].includes(h0))state.tab=h0;
render();initDb();
