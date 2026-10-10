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
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
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
const FOOD=[
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
const state={tab:'calendrier',week:BASE_WEEK,dayFilter:null,imported:{},checks:{},db:null,files:[],pending:null,busy:false};
function loadLocal(){try{const v=JSON.parse(localStorage.getItem(LS)||'{}');state.imported=v.meals||{};state.checks=v.checks||{}}catch(e){}}
function saveLocal(){try{localStorage.setItem(LS,JSON.stringify({meals:state.imported,checks:state.checks}))}catch(e){}}
loadLocal();
const getMeal=(date,slot)=>state.imported[`${date}_${slot}`]||BASE[`${date}_${slot}`]||null;
const weekHasMeals=mon=>{for(let i=0;i<7;i++)for(const s of ['midi','soir'])if(getMeal(addDays(mon,i),s))return true;return false};
(function initWeek(){const cur=mondayOf(TODAY);state.week=weekHasMeals(cur)?cur:BASE_WEEK})();

async function initDb(){
  try{
    if(!window.claude||!claude.use)return;
    const db=await claude.use('db');if(!db)return;
    state.db=db;setSync(true);
    db.collection('meals').onSnapshot(snap=>{const m={};snap.docs.forEach(d=>{const v=d.data();if(v&&v.date&&v.slot)m[d.id]=v});state.imported=m;saveLocal();render()},()=>setSync(false));
    db.collection('checks').onSnapshot(snap=>{const c={};snap.docs.forEach(d=>{const v=d.data();c[d.id]=(v&&v.items)||{}});state.checks=c;saveLocal();if(state.tab==='courses')render()},()=>{});
  }catch(e){setSync(false)}
}
function setSync(ok){const el=document.getElementById('sync');el.classList.toggle('ok',ok);el.querySelector('span').textContent=ok?'Synchronisé sur vos appareils':'Enregistré sur cet appareil'}
async function saveMeal(m){const id=`${m.date}_${m.slot}`;state.imported[id]=m;saveLocal();
  if(state.db){try{await state.db.collection('meals').doc(id).set(m)}catch(e){toast("Enregistré sur cet appareil seulement : la synchronisation a échoué.")}}}
async function deleteMeal(id){delete state.imported[id];saveLocal();render();
  if(state.db){try{await state.db.collection('meals').doc(id).delete()}catch(e){}}}
let checkTimer=null;
function saveChecks(week){saveLocal();if(!state.db)return;clearTimeout(checkTimer);
  checkTimer=setTimeout(()=>{state.db.collection('checks').doc(week).set({items:state.checks[week]||{}}).catch(()=>{})},500)}

/* ---------- Rendu ---------- */
const main=document.getElementById('main');
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,3200)}
function setTab(t,opts={}){state.tab=t;try{history.replaceState(null,'','#'+t)}catch(e){}render();if(!opts.keepScroll)window.scrollTo({top:0})}
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
  else renderImport();
  main.querySelectorAll('[data-wk]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.wk;state.week=v==='today'?mondayOf(TODAY):addDays(state.week,+v);state.dayFilter=null;render()}));
  bind();
}
function renderCalendar(){
  if(!weekHasMeals(state.week))return emptyWeek();
  let h='<div class="cal">';
  for(let i=0;i<7;i++){const date=addDays(state.week,i),today=date===TODAY;
    h+=`<section class="day${today?' today':''}"><h3>${JOURS[i]} <span>${today?'<span class="tag">Aujourd\'hui · </span>':''}${fmtDay(date)}</span></h3>`;
    for(const s of ['midi','soir']){const m=getMeal(date,s);
      if(!m){h+=`<div class="meal empty"><span class="pill ${s}">${s==='midi'?'Midi':'Soir'}</span> Rien de prévu</div>`;continue}
      h+=`<button class="meal" data-open="${date}_${s}"><span class="slot"><span class="pill ${s}">${s==='midi'?'Midi':'Soir'}</span>${m.base?'':'<span class="pill imp">Importé</span>'}</span>
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
  const items=portionOf(m),steps=Array.isArray(m.etapes)?m.etapes:[],ing=Array.isArray(m.ingredientsAdultes)?m.ingredientsAdultes:[],tips=Array.isArray(m.conseils)?m.conseils:[];
  let h=`<article class="rcard" id="r-${m._id}"><header>
    <div class="meta"><span class="pill ${m.slot}">${JOURS[m._i]} ${m.slot==='midi'?'midi':'soir'}</span>${m.temps?`<span>${esc(m.temps)}</span>`:''}${m.base?'':`<span class="pill imp">${m.recetteFournie===false?'Fiche proposée par Claude':'Importé'}</span>`}</div>
    <h2>${esc(m.titre)}</h2><div class="baby">Johan : ${esc(m.bebe||'portion à définir')}</div></header>
    ${portionFigure(m)}<div class="rbody">`;
  h+=`<div class="ing"><div><h4>Ingrédients · 2 adultes + Johan</h4>${ing.length?`<ul>${ing.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`:'<p class="muted">Pas de liste d\'ingrédients dans le texte importé.</p>'}</div>
    <div class="johan"><h4>Portion de Johan</h4><ul>${items.map(i=>`<li><span>${esc(i.nom)}</span><span>${i.g} g</span></li>`).join('')}<li><span>Total</span><span>${items.reduce((s,i)=>s+i.g,0)} g</span></li></ul></div></div>`;
  if(steps.length)h+=`<div><h4>Préparation</h4><ol class="steps">${steps.map((s,i)=>i===m.etapeBebe?`<li class="bb"><div><b>Portion de Johan, avant d'assaisonner</b>${esc(s)}</div></li>`:`<li><div>${esc(s)}</div></li>`).join('')}</ol></div>`;
  else h+=`<p class="muted">Pas d'étapes dans le texte importé. Collez la recette dans l'onglet Importer pour compléter la fiche.</p>`;
  if(tips.length)h+=`<div class="tips"><h4>Texture et sécurité pour Johan</h4><ul>${tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>`;
  if(!m.base)h+=`<div class="rfoot"><button class="btn danger" data-del="${m._id}">Retirer ce repas</button></div>`;
  return h+'</div></article>'}
function rayonOf(name){const n=norm(name);
  if(/cabillaud|poisson|saumon|colin|merlu|lieu|truite|dorade|dinde|poulet|volaille|veau|steak|boeuf|viande|hache|porc|agneau|jambon|lardon|saucisse|crevette/.test(n))return RAYONS[1];
  if(/oeuf|lait|creme|beurre|fromage|comte|chevre|yaourt|emmental|gruyere|parmesan|ricotta|mozzarella|pate brisee|pate feuilletee/.test(n))return RAYONS[2];
  if(/\briz\b|\bpates?\b|coquillette|semoule|farine|huile|sel|poivre|epice|herbes de provence|bouillon|cidre|vin|sucre|pain|biscotte|lentille|conserve|muscade|bouquet garni|vinaigre|moutarde/.test(n))return RAYONS[3];
  return RAYONS[0]}
function shoppingFor(week){
  const groups={};RAYONS.forEach(r=>groups[r]=[]);
  const list=weekMealList();const anyBase=list.some(m=>m.base);
  if(anyBase&&week===BASE_WEEK)RAYONS.forEach(r=>BASE_LIST[r].forEach(([n,q,note])=>groups[r].push({k:'b|'+n,n,q,note})));
  const merged={},missing=[];
  list.filter(m=>!m.base).forEach(m=>{
    const c=Array.isArray(m.courses)?m.courses:[];
    if(!c.length){missing.push(m);return}
    c.forEach(it=>{const nom=String(it.nom||'').trim();if(!nom)return;const key=norm(nom);const ray=RAYONS.includes(it.rayon)?it.rayon:rayonOf(nom);
      if(!merged[key])merged[key]={k:'i|'+key,n:nom,q:[],note:[],r:ray};
      if(it.quantite)merged[key].q.push(String(it.quantite));merged[key].note.push(JOURS[m._i].toLowerCase())})});
  Object.values(merged).forEach(x=>groups[x.r].push({k:x.k,n:x.n,q:x.q.join(' + '),note:'Importé · '+[...new Set(x.note)].join(', ')}));
  return {groups,missing}}
function renderShopping(){
  if(!weekHasMeals(state.week))return emptyWeek();
  const {groups,missing}=shoppingFor(state.week),ch=state.checks[state.week]||{};
  const all=RAYONS.flatMap(r=>groups[r]),done=all.filter(i=>ch[i.k]).length;
  let h=`<div class="shophead"><div class="progress"><span class="eyebrow">Dans le panier</span> <b>${done} / ${all.length} articles</b><div class="track"><span style="width:${all.length?done/all.length*100:0}%"></span></div></div>
    <button class="btn" data-uncheck ${done?'':'disabled'}>Tout décocher</button></div>`;
  if(state.week===BASE_WEEK&&all.length)h+=`<p class="muted" style="margin:0 0 14px">Quantités calculées recette par recette pour 2 adultes et les portions de 200 g de Johan. Les courges sont pesées brutes, avec peau et graines.</p>`;
  h+='<div class="aisles">';
  RAYONS.forEach(r=>{const g=groups[r];if(!g.length)return;const dn=g.filter(i=>ch[i.k]).length;
    h+=`<section class="aisle"><h3>${r} <span>${dn}/${g.length}</span></h3>`;
    g.forEach((it,ix)=>{const id='c'+r.length+'_'+ix+'_'+norm(it.n).replace(/[^a-z0-9]/g,'').slice(0,20);
      h+=`<label class="item${ch[it.k]?' done':''}" for="${id}"><input type="checkbox" id="${id}" data-ck="${esc(it.k)}" ${ch[it.k]?'checked':''}><span><span class="nm">${esc(it.n)}</span>${it.q?` <span class="qt">· ${esc(it.q)}</span>`:''}${it.note?`<small>${esc(it.note)}</small>`:''}</span></label>`});
    h+='</section>'});
  h+='</div>';
  if(missing.length)h+=`<div class="note">Ces repas importés n'avaient pas de liste d'ingrédients : ${missing.map(m=>`<b>${esc(m.titre)}</b> (${JOURS[m._i].toLowerCase()})`).join(', ')}. Collez leur recette dans Importer pour les ajouter à la liste.</div>`;
  return h}

/* ---------- Import ---------- */
function renderImport(){
  const prevText=document.getElementById('importText')?.value||state.draft||'';
  main.innerHTML=`<div style="height:14px"></div><div class="imp">
   <div class="panel"><div><h3 style="font-size:1.25rem">Ajouter un menu ou une recette</h3><p class="muted" style="margin:4px 0 0">Collez du texte, déposez un fichier ou une photo, puis chargez.</p></div>
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
    <li>Quand l'analyse par Claude est disponible, elle lit aussi les photos et complète les fiches (ingrédients, étapes, liste de courses). Sinon, l'appli lit le texte elle-même.</li>
    <li>Un repas importé remplace celui déjà prévu sur le même créneau. Il se retire depuis sa fiche recette.</li></ul></div></div>
   <div id="pending"></div>`;
  renderFiles();renderPending();bindImport()}
function renderFiles(){const el=document.getElementById('files');if(!el)return;
  el.innerHTML=state.files.map((f,i)=>`<span class="file"><span>${f.type.startsWith('image/')?'Photo · ':''}${esc(f.name)}</span><button aria-label="Retirer ${esc(f.name)}" data-rmf="${i}">×</button></span>`).join('');
  el.querySelectorAll('[data-rmf]').forEach(b=>b.onclick=()=>{state.files.splice(+b.dataset.rmf,1);renderFiles()})}
function setStatus(msg,err,spin){const el=document.getElementById('status');if(!el)return;el.className='status'+(err?' err':'');el.innerHTML=(spin?'<span class="spin"></span>':'')+esc(msg)}
function addFiles(list){for(const f of list)state.files.push(f);renderFiles()}
function bindImport(){
  const drop=document.getElementById('drop'),fi=document.getElementById('fileInput'),ta=document.getElementById('importText');
  drop.onclick=()=>fi.click();drop.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fi.click()}};
  fi.onchange=()=>{addFiles(fi.files);fi.value=''};
  ['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
  ['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over')}));
  drop.addEventListener('drop',e=>{const dt=e.dataTransfer;if(dt.files&&dt.files.length)addFiles(dt.files);else{const t=dt.getData('text');if(t){ta.value+=(ta.value?'\n':'')+t;state.draft=ta.value}}});
  ta.addEventListener('input',()=>state.draft=ta.value);
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
    text=text.trim();let meals=null,via='';
    const sample=window.claude&&claude.use?await claude.use('sample').catch(()=>null):null;
    if(sample){
      setStatus('Analyse par Claude…',false,true);
      try{let imgOk=false;if(imgs.length){const lim=await sample.limits().catch(()=>null);imgOk=!!(lim&&lim.images)}
        const res=await sample.json(aiPrompt(text,imgOk&&imgs.length),{modelTier:'default',images:imgOk&&imgs.length?imgs.slice(0,4):undefined});
        if(res&&Array.isArray(res.repas)&&res.repas.length){meals=res.repas;via='Claude'}
      }catch(e){if(e&&e.code==='rate_limited')setStatus('Trop de demandes, analyse locale à la place.',true)}
    }
    if(!meals){
      if(!text){setStatus("Les photos demandent l'analyse par Claude, indisponible ici. Collez le texte du menu.",true);return}
      meals=localParse(text);via='appli'}
    if(!meals.length){setStatus("Aucun repas reconnu. Mettez un titre de plat par ligne, ou les jours suivis de Midi : / Soir :.",true);return}
    meals=meals.map(cleanMeal);
    const hasDays=meals.some(m=>m.jour!==null);
    const nextMon=addDays(mondayOf(TODAY),7);
    state.pending={meals,hasDays,week:hasDays?(weekHasMeals(nextMon)&&!weekHasMeals(addDays(nextMon,7))?addDays(nextMon,7):nextMon):null,via};
    meals.forEach(m=>{m.inc=true;m.slotSel=m.creneau||'midi';m.dateSel=''});
    setStatus(`${meals.length} repas reconnu${meals.length>1?'s':''} (analyse ${via==='Claude'?'par Claude':"par l'appli"}).`);
    renderPending();document.getElementById('pending')?.scrollIntoView({behavior:'smooth',block:'start'});
  }finally{state.busy=false;const b=document.getElementById('loadBtn');if(b)b.disabled=false}}
function aiPrompt(text,withImg){return `Tu analyses ${withImg?'une ou plusieurs photos et ':''}un texte collés dans une appli de menus familiaux : 2 adultes et Johan, un bébé de 13 mois. Chaque repas de Johan pèse exactement 200 g, prélevé avant l'assaisonnement des adultes. Saison : automne.
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
"recetteFournie":true si le texte contenait la recette, false si tu l'as proposée}]}
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
    recetteFournie:m.recetteFournie!==false,kind:/soupe|veloute|potage|bouillon/.test(norm(m.titre))?'bowl':'plate'}}

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

function targetOf(m,p){if(m.jour!==null&&p.week)return {date:addDays(p.week,m.jour),slot:m.creneau||m.slotSel};return {date:m.dateSel,slot:m.slotSel}}
function renderPending(){
  const el=document.getElementById('pending');if(!el)return;const p=state.pending;if(!p){el.innerHTML='';return}
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
    else h+=`<input type="date" id="pDate${i}" data-pd="${i}" value="${m.dateSel}" aria-label="Date pour ${esc(m.titre)}">`;
    if(m.creneau&&m.jour!==null)h+=`<span class="pill ${m.creneau}">${m.creneau}</span>`;
    else h+=`<select id="pSlot${i}" data-ps="${i}" aria-label="Créneau"><option value="midi" ${m.slotSel==='midi'?'selected':''}>Midi</option><option value="soir" ${m.slotSel==='soir'?'selected':''}>Soir</option></select>`;
    h+='</div>';
    if(m.inc&&ex&&tg.date)h+=`<div class="warn">Remplace « ${esc(ex.titre)} » du ${fmtLong(tg.date)} ${tg.slot}</div>`;
    h+='</div>'});
  const ready=p.meals.some(m=>m.inc)&&p.meals.every(m=>!m.inc||(m.jour!==null?!!p.week:!!m.dateSel));
  h+=`</div><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn primary" id="pSave" ${ready?'':'disabled'}>Ajouter au calendrier</button><button class="btn ghost" id="pCancel">Annuler</button></div></section>`;
  el.innerHTML=h;
  el.querySelectorAll('[data-pw]').forEach(b=>b.onclick=()=>{p.week=b.dataset.pw;renderPending()});
  const wd=el.querySelector('#pWeekDate');if(wd)wd.onchange=()=>{if(wd.value){p.week=mondayOf(wd.value);renderPending()}};
  el.querySelectorAll('[data-pi]').forEach(x=>x.onchange=()=>{p.meals[+x.dataset.pi].inc=x.checked;renderPending()});
  el.querySelectorAll('[data-pd]').forEach(x=>x.onchange=()=>{p.meals[+x.dataset.pd].dateSel=x.value;renderPending()});
  el.querySelectorAll('[data-ps]').forEach(x=>x.onchange=()=>{p.meals[+x.dataset.ps].slotSel=x.value;renderPending()});
  el.querySelector('#pCancel').onclick=()=>{state.pending=null;renderPending()};
  el.querySelector('#pSave').onclick=commitPending}
async function commitPending(){
  const p=state.pending;const btn=document.getElementById('pSave');btn.disabled=true;btn.textContent='Ajout…';
  const seen=new Set();let n=0,first=null;
  for(const m of p.meals){if(!m.inc)continue;const tg=targetOf(m,p);if(!tg.date||!tg.slot)continue;const key=tg.date+'_'+tg.slot;if(seen.has(key))continue;seen.add(key);
    const rec={date:tg.date,slot:tg.slot,titre:m.titre,bebe:m.bebe,temps:m.temps,kind:m.kind,ingredientsAdultes:m.ingredientsAdultes,portionBebe:m.portionBebe||guessPortion(m.bebe,tg.slot),
      courses:m.courses,etapes:m.etapes,etapeBebe:m.etapeBebe,conseils:m.conseils,recetteFournie:m.recetteFournie,source:p.via,addedAt:new Date().toISOString()};
    await saveMeal(rec);n++;if(!first||tg.date<first)first=tg.date}
  state.pending=null;state.files=[];state.draft='';
  if(first){state.week=mondayOf(first);state.dayFilter=null}
  setTab('calendrier');toast(`${n} repas ajouté${n>1?'s':''} · semaine ${weekLabel(state.week)}`)}

/* ---------- Événements communs ---------- */
function bind(){
  main.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setTab(b.dataset.go));
  main.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{const id=b.dataset.open,d=id.split('_')[0];state.dayFilter=dayIdx(d);setTab('recettes');
    requestAnimationFrame(()=>document.getElementById('r-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}))});
  main.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{const v=b.dataset.day;state.dayFilter=v==='all'?'all':+v;render()});
  main.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(b.dataset.confirm){deleteMeal(b.dataset.del);toast('Repas retiré du calendrier')}else{b.dataset.confirm='1';b.textContent='Confirmer le retrait';setTimeout(()=>{if(b.isConnected){delete b.dataset.confirm;b.textContent='Retirer ce repas'}},4000)}});
  main.querySelectorAll('[data-ck]').forEach(x=>x.onchange=()=>{const w=state.week;state.checks[w]=state.checks[w]||{};if(x.checked)state.checks[w][x.dataset.ck]=true;else delete state.checks[w][x.dataset.ck];saveChecks(w);
    const y=window.scrollY;render();window.scrollTo(0,y)});
  const un=main.querySelector('[data-uncheck]');if(un)un.onclick=()=>{state.checks[state.week]={};saveChecks(state.week);render()};
}
const h0=(location.hash||'').slice(1);if(['calendrier','courses','recettes','importer'].includes(h0))state.tab=h0;
render();initDb();
