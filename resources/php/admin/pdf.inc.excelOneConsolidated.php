<?php
define('FPDF_FONTPATH','../../lib/fpdf/font/');
require_once('../../lib/pdftable/lib/pdftable.inc.php');

class PDF extends PDFTable{
function PDF($orientation='P',$unit='mm',$format='A4'){
    PDFTable::PDFTable($orientation,$unit,$format);
    $this->AddFont('TimesNewRomanPSMT','','times.php');
    $this->AddFont('TimesNewRomanPSMT','B','times_b.php');
    $this->AliasNbPages();
}

// верхний колонтитул
function Header(){
    parent::Header();
    $this->setStyle('small');
    $this->x = $this->left;
    $this->y = $this->top-$this->getLineHeight()-0.5;
}

// нижний колонтитул
function Footer(){
    $this->setStyle('small');
    $this->x = $this->left;
    $this->y = $this->bottom+0.5;
    $page = $this->convert('Страница '.$this->PageNo().'/{nb}');
    $html = "
	<table width=$this->width><tr>
		<td align=right nowrap>$page</td>
	</tr></table>
	";
    $this->hr();
    $this->htmltable($html,0);
}

// устанавливаем размер шрифта
function setStyle($style='normal'){
    switch ($style){
        case 'title':
            $this->SetFont('TimesNewRomanPSMT','',19);
            break;
        case 'small':
            $this->SetFont('TimesNewRomanPSMT','',12);
            break;
        case 'normal':
            $this->SetFont('TimesNewRomanPSMT','',14);
            break;
        default:
            $this->SetFont('TimesNewRomanPSMT','',15);
    }
}

// кодировка
function convert($txt){
        $to = "CP1251";
        $from = "UTF-8";
        return mb_convert_encoding($txt, $to, $from);
}

// вывод текста
function text($w,$txt,$border=0,$align='J',$fill=0){
    FPDF::MultiCell($w,$this->FontSizePt/2,$this->convert($txt),$border,$align,$fill);
}

// горизонтальная полоса
function hr(){
    $this->Line($this->left,$this->y,$this->right,$this->y);
}

}//end of class
?>