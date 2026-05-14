import { jsPDF } from 'jspdf';
import { fmtDate, fmtDateTime } from '../utils/helpers';

export const genererRapportEUDR = (lot) => {
  const doc = new jsPDF();
  const GR = [30, 58, 30], ACC = [230, 126, 34], W = [255, 255, 255], LG = [238, 243, 230], GS = [74, 104, 64];

  // En-tête
  doc.setFillColor(...GR); doc.rect(0, 0, 210, 46, 'F');
  doc.setFillColor(...ACC); doc.rect(0, 42, 210, 4, 'F');
  doc.setTextColor(...W);
  doc.setFontSize(22); doc.setFont(undefined, 'bold');
  doc.text('ChainCacao', 15, 18);
  doc.setFontSize(10); doc.setFont(undefined, 'normal');
  doc.text('Rapport de traçabilité conforme au Règlement EUDR (UE 2023/1115)', 15, 28);
  doc.setFontSize(8);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 15, 36);
  doc.setFillColor(255, 248, 236);
  doc.roundedRect(130, 12, 68, 24, 4, 4, 'F');
  doc.setTextColor(...ACC); doc.setFontSize(7); doc.setFont(undefined, 'bold');
  doc.text('IDENTIFIANT DU LOT', 164, 19, { align: 'center' });
  doc.setFontSize(11); doc.setTextColor(...GR);
  doc.text(lot.id, 164, 29, { align: 'center' });

  let y = 58;
  // Infos lot
  doc.setFillColor(...LG); doc.rect(10, y, 190, 8, 'F');
  doc.setDrawColor(...GR); doc.rect(10, y, 190, 8, 'S');
  doc.setTextColor(...GR); doc.setFontSize(9); doc.setFont(undefined, 'bold');
  doc.text('INFORMATIONS DU LOT', 14, y + 5.5);
  y += 14;

  const fields = [
    ['Espèce / Variété', lot.espece],
    ['Producteur', lot.producteur],
    ['Téléphone producteur', lot.producteurPhone || 'N/A'],
    ['Coopérative', lot.cooperative],
    ['Coordonnées GPS (parcelle)', lot.gpsOrigine],
    ['Date de récolte', fmtDate(lot.dateRecolte)],
    ['Poids initial récolté', `${lot.poidsInitial} kg`],
    ['Poids après transformation', `${lot.nouveauPoids || lot.poidsInitial} kg`],
    ['Lot transformé', lot.transformed ? 'Oui' : 'Non'],
    ['Lot exporté', lot.exported ? 'Oui' : 'Non'],
  ];

  fields.forEach(([k, v], i) => {
    if (y > 275) { doc.addPage(); y = 20; }
    if (i % 2 === 0) doc.setFillColor(248, 252, 246), doc.rect(10, y - 5, 190, 8, 'F');
    doc.setTextColor(...GS); doc.setFont(undefined, 'normal'); doc.text(k, 14, y);
    doc.setTextColor(...GR); doc.setFont(undefined, 'bold'); doc.text(String(v), 120, y);
    doc.setDrawColor(220, 230, 215); doc.line(10, y + 2, 200, y + 2);
    y += 9;
  });

  // Historique
  y += 4;
  if (y > 250) { doc.addPage(); y = 20; }
  doc.setFillColor(...LG); doc.rect(10, y, 190, 8, 'F');
  doc.setDrawColor(...GR); doc.rect(10, y, 190, 8, 'S');
  doc.setTextColor(...GR); doc.text('HISTORIQUE COMPLET DE TRAÇABILITÉ', 14, y + 5.5);
  y += 14;

  lot.historique.forEach((ev, i) => {
    if (y > 265) { doc.addPage(); y = 20; }
    doc.setFillColor(...ACC); doc.circle(15.5, y, 4, 'F');
    doc.setTextColor(...W); doc.setFontSize(7.5); doc.setFont(undefined, 'bold');
    doc.text(String(i + 1), 15.5, y + 1, { align: 'center' });
    doc.setTextColor(...GR); doc.setFontSize(9.5); doc.setFont(undefined, 'bold');
    doc.text(`${ev.etape}`, 23, y);
    doc.setFontSize(8.5); doc.setFont(undefined, 'normal'); doc.setTextColor(...GS);
    doc.text(`Acteur : ${ev.acteur}`, 80, y);
    y += 7;
    doc.setFontSize(8);
    doc.text(`Date : ${fmtDateTime(ev.date)}`, 23, y); y += 5.5;
    doc.text(`Localisation : ${ev.localisation}`, 23, y); y += 5.5;
    doc.text(`Poids : ${ev.poids} kg`, 23, y); y += 5.5;
    if (ev.comment) { doc.text(`Commentaire : ${ev.comment}`, 23, y); y += 5.5; }
    doc.setDrawColor(220, 230, 215); doc.line(23, y, 195, y); y += 5;
  });

  // Certification
  if (y > 252) { doc.addPage(); y = 20; }
  y += 4;
  doc.setFillColor(...GR); doc.rect(10, y, 190, 26, 'F');
  doc.setFillColor(...ACC); doc.rect(10, y, 4, 26, 'F');
  doc.setTextColor(...W); doc.setFontSize(9); doc.setFont(undefined, 'bold');
  doc.text('CERTIFICATION DE CONFORMITÉ EUDR', 18, y + 8);
  doc.setFontSize(7.5); doc.setFont(undefined, 'normal');
  doc.text('Ce document certifie que la traçabilité géographique du lot est complète et que le produit', 18, y + 15);
  doc.text('est conforme au Règlement (UE) 2023/1115 relatif à la déforestation (EUDR), applicable depuis 2025.', 18, y + 21);

  doc.save(`ChainCacao_EUDR_${lot.id}.pdf`);
};