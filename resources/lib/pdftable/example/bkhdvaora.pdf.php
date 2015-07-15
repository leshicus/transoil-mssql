<?php
require_once('pdf.inc.php');
$p = new PDF();
$p->SetMargins(15,15,15);
$p->AddPage('L');
$p->setStyle('title');
$p->text(0,'t4',0,'C');
$p->setfont('vni_times','',10);
$p->text(0,"(t5)\n(t6)\nt7 ",0,'C');
$html = "
<table width=$p->width>
<tr><td width=18>t3<td width=180>:<td width=13>t8<td>:/GTGT
<tr><td>t1<td>: <td>t2<td>:
<tr><td>t9<td>:
";
$p->htmltable($html);
$p->Ln(3);
$vr1 = 't10';
$vr2 = 't11';
$html = '
<table width='.$p->width.' align=center>
<tr bgcolor=#eeeeee repeat=1>
<td align=center border=1111 rowspan=2 width=1>S<br>T<br>T
<td align=center border=1110 colspan=3>q1 '.$vr1.'
<td align=center border=1110 rowspan=2 width=50>q2 '.$vr2.'
<td align=center border=1110 rowspan=2>q3
<td align=center border=1110 rowspan=2 width=50>q4
<td align=center border=1110 rowspan=2>q5 '.$vr1.' q6
<td align=center border=1110 rowspan=2 nowrap>q7<br>q8
<td align=center border=1110 rowspan=2>q9 GTGT
<td align=center border=1110 rowspan=2 width=10>q10
<tr bgcolor=#eeeeee repeat=1>
<td align=center border=0110>q11
<td align=center border=0110>q12
<td align=center border=0110>q13
';

$stt = 1;
//Seri, Code, Publish, B.Name,TaxCode,Good, C.Total, TaxRatio, Tax
for($i=0; $i<111; $i++) {
	$html .= '<tr>'.
	'<td align=center border=0111 nowrap>'.$stt
	.'<td align=center border=0110 nowrap>'.$i
	.'<td border=0110 width=20>&nbsp;'
	;
	$stt++;
}
$p->htmltable($html);
$p->Ln(3);
$time = strftime('w1 %Y');
$html = "<table width=$p->width>
<tr><td align=center valign=top height=40>&nbsp;<br>w3<br>(w2)<td align=center valign=top>$time<br>w4<br>(w5)
";
$p->htmltable($html);
$p->output('123.pdf','I');
//$p->download('bkhd'.'vao');
?>