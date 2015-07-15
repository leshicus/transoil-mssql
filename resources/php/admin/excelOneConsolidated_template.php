<?php
// * Excel заголовок для одиночной Сводной ведомости excelOneConsolidated

$header = '<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Created>2006-09-28T05:33:49Z</Created>
  <LastSaved>2013-12-17T15:35:33Z</LastSaved>
  <Version>12.00</Version>
 </DocumentProperties>
 <OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">
  <RemovePersonalInformation/>
 </OfficeDocumentSettings>
 <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">
  <WindowHeight>8016</WindowHeight>
  <WindowWidth>15120</WindowWidth>
  <WindowTopX>708</WindowTopX>
  <WindowTopY>384</WindowTopY>
  <ProtectStructure>False</ProtectStructure>
  <ProtectWindows>False</ProtectWindows>
 </ExcelWorkbook>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Bottom"/>
   <Borders/>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="11"
    ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="s63">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="11"
    ss:Color="#000000" ss:Bold="1"/>
  </Style>
  <Style ss:ID="s64">
   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom"/>
  </Style>
  <Style ss:ID="s65">
   <Alignment ss:Vertical="Bottom"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="14"
    ss:Color="#000000"/>
  </Style>
  <Style ss:ID="s66">
   <Alignment ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="s68">
   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="18"
    ss:Color="#000000"/>
  </Style>
  <Style ss:ID="s69">
   <Alignment ss:Horizontal="Right" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="11"
    ss:Color="#000000" ss:Bold="0"/>
  </Style>
  <Style ss:ID="s70">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
   <Font ss:FontName="Times New Roman" x:CharSet="204" x:Family="Swiss" ss:Size="11"
    ss:Color="#000000" ss:Bold="0"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Сводная ведомость">
  <Table ss:ExpandedColumnCount="14"  x:FullColumns="1" x:FullRows="1">
   <Column ss:AutoFitWidth="0" ss:Width="40"/>
   <Column ss:AutoFitWidth="0" ss:Width="160"/>
   <Column ss:AutoFitWidth="0" ss:Width="222"/>
   <Column ss:AutoFitWidth="0" ss:Width="120"/>
   <Column ss:AutoFitWidth="0" ss:Width="85"/>
   <Column ss:AutoFitWidth="0" ss:Width="40"/>
   <Column ss:AutoFitWidth="0" ss:Width="55"/>
   <Row ss:Height="21">
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s65"/>
    <Cell ss:StyleID="s68"><Data ss:Type="String">Сводная зкзаменационная ведомость</Data></Cell>
   </Row>
';


$footer = '</Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
   <PageSetup>
    <Layout x:Orientation="Landscape"/>
    <Header x:Margin="0"/>
    <Footer x:Margin="0.4" x:Data="&amp;R&amp;P/&amp;N"/>
    <PageMargins x:Bottom="0.8" x:Left="1" x:Right="0.4" x:Top="1"/>
   </PageSetup>
   <Print>
    <ValidPrinterInfo/>
    <PaperSizeIndex>9</PaperSizeIndex>
    <HorizontalResolution>600</HorizontalResolution>
    <VerticalResolution>600</VerticalResolution>
   </Print>
   <Zoom>85</Zoom>
   <Selected/>
   <Panes>
    <Pane>
     <Number>3</Number>
     <ActiveRow>8</ActiveRow>
     <ActiveCol>2</ActiveCol>
    </Pane>
   </Panes>
   <ProtectObjects>False</ProtectObjects>
   <ProtectScenarios>False</ProtectScenarios>
  </WorksheetOptions>
 </Worksheet>
</Workbook>';