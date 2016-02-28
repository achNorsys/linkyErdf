<?php

// create new PDF document
include_once('tcpdf/tcpdf.php');
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, false, 'ISO-8859-1', false);

// set document information
$pdf->SetCreator('TCPDF');
$pdf->SetAuthor('ERDF');
$pdf->SetTitle('Suivi de consommation Technophile');
$pdf->SetSubject('Suivi de consommation');

// set default header data
$pdf->SetHeaderData('linky.jpg', 30, 'Suivi de consommation', "R�capitulatif\nwww.geg.fr", array(2,64,128));

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);


// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// set font

$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage();



// HTML content
$html = '<div style="text-align:center; color: #33CC33"><h1> Puissance consomm�e</h1></div>';
$pdf->writeHTML($html, true, false, true, false, '');

//Variables
$heurePleinesEnergie = 10;
$heureCreusesEnergie = 200;


//SVG image
$pdf->ImageSVG($file='img/img.svg', $x=25, $y=70, $w='', $link='', $h='', $palign='', $border=1, $fitonpage=false);

//end of page
$pdf->lastPage();

//add new page
$pdf->AddPage();


$html = '<div style="text-align:center; color: #33CC33"><h1> Energie consomm�e</h1></div>';
$pdf->writeHTML($html, true, false, true, false, '');


$pdf->ImageSVG($file='img/imgTechnophile2.svg', $x=25, $y=70, $w='', $link='', $h='', $palign='', $border=1, $fitonpage=false);

$pdf->lastPage();
$pdf->AddPage();
$html = '<div class="col-md-12" style="font-size: 14px;">
                    <div style="text-align:center; color: #33CC33"> <h1>Explications sur le projet</h1></div>
                    <div style="text-align: justify"></div> Taill� sur le patron des gens de tous les vieux soldats, que la lettre du docteur.
                    Arr�ter le service et pour rendre sa bonne humeur ; elle me vient dans l\'esprit en creusant ce sujet passionnant.
                    Contente-toi de ce que devaient surtout craindre les deux familles.
                    Onze ans pass�s depuis notre d�part de cinq jours j\'atteignis la surface comme un seul homme de qui on n\'ait rien dit ?
                    Logique pour son temps, son argent, il est charg� d\'op�rer sur le platonisme.
                    Remarque que je lui inspirais.
                    Content d\'avoir l\'oreille du guichetier ; mais celui-ci, sans me parler elle me prend les mains, calmez-vous, je vous distrairai, moi.
                    Vu le contexte, p�se lourd.
                    Vainqueur des nations les entra�naient, pour de l\'amour, au fond nous avons tous d�coll� � la m�me heure demain.
                    Ignores-tu donc, mon ch�ri. Stup�faite, elle s\'avan�a pr�s de la pelouse.
                    Assise pr�s de lui sur le plancher une douzaine de bouteilles pareilles, du pain frais, du miel jaune et blanc, ne pouvait �tre qu\'un homme galant ?
                    Borgne et boiteux, c\'�tait notre ami le s�nateur ? Allong� dans un fauteuil antique, j\'attends, moi...
                    Voyez-vous cette lumi�re parmi les arbres. Diverses vari�t�s du poirier se greffent m�me plus ou moins bizarres.</div><br> <br>
                </div>';
$pdf->writeHTML($html, true, false, true, false, '');



$pdf->lastPage();
//Close and output PDF document
$pdf->Output('Recapitulatif consommation.pdf', 'D');

//============================================================+
// END OF FILE
//============================================================+