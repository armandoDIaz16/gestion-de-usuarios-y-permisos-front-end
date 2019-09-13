import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraficasAsesoriaService } from '../../../services/graficasAsesoria.service';
import { NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ValidarModuloService } from '../../../services/validarModulo.service';


am4core.useTheme(am4themes_animated);
let chart;
let chart1;
let chart2;
let chart3;
let chart4;
let chart5;

@Component({
  selector: 'app-reportesCoor',
  templateUrl: './reportesCoor.component.html',
  styleUrls: ['./reportesCoor.component.scss'],
  providers: [ValidarModuloService,GraficasAsesoriaService]
})
export class ReportesCoordComponent implements OnInit {
 
  materias = [];
  instutucion = [];
  carrera = [];
  institucionid = null;
  materiaid = null;
  carreraid = null;
  evalGeneral = null;
  evalIntegral = null;
  evalSolAte = null;
  public mostrarModulo = false;


  constructor(private graficasAsesoriaService: GraficasAsesoriaService,
    private zone: NgZone,
    private validarModuloService: ValidarModuloService) { }

  ngOnInit() {
    this.mostrarModulo = this.validarModuloService.getMostrarModulo("Reportes");
    if (!this.mostrarModulo) {
      return;
    }
    this.graficasAsesoriaService.getMateria().subscribe(data => {
      for (var motivos in data) {
        this.materias.push(data[motivos].MATERIA_APOYO1);
        // console.log(this.materias)
      }
    });
    this.graficasAsesoriaService.getInstitucion().subscribe(data => {
      for (var motivos in data) {
        this.instutucion.push(data[motivos]);
        // console.log(this.instutucion)
      }
    });
    this.graficasAsesoriaService.getCarrera().subscribe(data => {
      for (var motivos in data) {
        this.carrera.push(data[motivos]);
        //console.log(this.carrera)
      }
    });
  }

  motivos(datos, at) {
    this.zone.runOutsideAngular(() => {
      chart = am4core.create("chartdiv", am4charts.PieChart);
      var title = chart.titles.create();
      title.text = at;
      title.fontSize = 25;
      title.marginBottom = 30;
      chart.paddingRight = 20;

      let data = datos;

      chart.exporting.menu = new am4core.ExportMenu();
      chart.data = data;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    });
  }

  evaluacion(datos, at) {
    this.zone.runOutsideAngular(() => {
      chart1 = am4core.create("chartdiv1", am4charts.PieChart);

      var title = chart1.titles.create();
      title.text = at;
      title.fontSize = 25;
      title.marginBottom = 30;
      chart1.paddingRight = 20;

      let data = datos;

      chart1.exporting.menu = new am4core.ExportMenu();
      chart1.data = data;

      let pieSeries = chart1.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    });
  }

  evaluacionIntegral(datos, at) {

    // Create chart instance
    chart2 = am4core.create("chartdiv2", am4charts.XYChart);
    var title = chart2.titles.create();
    title.text = at;
    title.fontSize = 25;
    title.marginBottom = 30;
    chart2.paddingRight = 20;


    // Add data
    chart2.exporting.menu = new am4core.ExportMenu();
    chart2.data = datos;

    // Create axes
    let categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {

      // Set up series
      let series = chart2.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;

      return series;
    }

    createSeries("Totalmente de acuerdo", "Totalmente de acuerdo");
    createSeries("De acuerdo", "De acuerdo");
    createSeries("Sin elementos", "Sin elementos");
    createSeries("En desacuerdo", "En desacuerdo");
    createSeries("Totalmente en desacuerdo", "Totalmente en desacuerdo");

    // Legend
    chart2.legend = new am4charts.Legend();

  }

  general(datos, at) {
    this.zone.runOutsideAngular(() => {
      chart3 = am4core.create("chartdiv3", am4charts.PieChart);

      var title = chart3.titles.create();
      title.text = at;
      title.fontSize = 25;
      title.marginBottom = 30;
      chart3.paddingRight = 20;

      let data = datos;

      chart3.exporting.menu = new am4core.ExportMenu();
      chart3.data = data;

      let pieSeries = chart3.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "country";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
    });
  }

  generalBarra(datos, at) {
    chart4 = am4core.create("chartdiv4", am4charts.XYChart);

    var title = chart4.titles.create();
    title.text = at;
    title.fontSize = 25;
    title.marginBottom = 30;
    chart4.paddingRight = 20;
    chart4.exporting.menu = new am4core.ExportMenu();


    // Add data
    chart4.data = datos;

    // Create axes
    let categoryAxis = chart4.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart4.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      let series = chart4.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "year";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }
    createSeries("solicitudes", "Solicitudes");
    createSeries("aceptados", "Aceptados");
    createSeries("aprobados", "Aprobados");
    createSeries("reprobados", "Reprobados");
  }

  solicitudAtencion(datos, at) {

    // Create chart instance
    chart5 = am4core.create("chartdiv5", am4charts.XYChart);
    var title = chart5.titles.create();
    title.text = at;
    title.fontSize = 25;
    title.marginBottom = 30;
    chart5.paddingRight = 20;


    // Add data
    chart5.exporting.menu = new am4core.ExportMenu();
    chart5.data = datos;

    // Create axes
    let categoryAxis = chart5.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;


    let valueAxis = chart5.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Create series
    function createSeries(field, name) {

      // Set up series
      let series = chart5.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "year";
      series.sequencedInterpolation = true;

      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;

      return series;
    }
    var array = [];
   //console.log(datos)
    for (var label in datos) {
      if (array.indexOf(datos[label].materia) == -1) {
        //console.log(array.indexOf(datos[label].materia))
        if (array.indexOf(datos[label].materia1) == -1) {
        //console.log(array.indexOf(datos[label].materia1))
          array.push(datos[label].materia)
          array.push(datos[label].materia1)
        }
      }

    }
   // console.log(array)
    for (var label in array) {
      createSeries(array[label], array[label]);
      //createSeries(datos[label], datos[label]);
    }


    // Legend
    chart5.legend = new am4charts.Legend();

  }

  motivospormateria() {
    this.graficasAsesoriaService.getGraficaMotivos(this.materiaid).subscribe(data => {
      this.motivos(data, this.materiaid);
      this.materiaid = null;
    });
  }

  motivosporinstitucional() {
    this.graficasAsesoriaService.getMotivosInstuticion(this.institucionid).subscribe(data => {
      if (this.institucionid == 1) {
        this.institucionid = "CAMPUS I"
      } else if (this.institucionid == 2) {
        this.institucionid = "CAMPUS II"
      }
      this.motivos(data, this.institucionid);
      this.institucionid = null;
    });
  }
  motivosporcarrera() {
    this.graficasAsesoriaService.getMotivosCarrera(this.carreraid).subscribe(data => {
      this.motivos(data, this.carreraid);
      this.carreraid = null;
    });
  }

  graficaeval() {
    if (this.evalGeneral == 'semestre') {
      this.graficasAsesoriaService.getGeneralEvalSemestre().subscribe(data => {
        this.evaluacion(data, 'SEMESTRE');
      });
    } else if (this.evalGeneral == 'carrera') {
      this.graficasAsesoriaService.getGeneralEvalCarrera().subscribe(data => {
        this.evaluacion(data, 'CARRERA');
      });
    } else if (this.evalGeneral == 'materia') {
      this.graficasAsesoriaService.getGeneralEvalMateria().subscribe(data => {
        this.evaluacion(data, 'MATERIA');
      });
    }

  }

  graficaEvalInt() {
    if (this.evalIntegral == 'REPORTE INTEGRAL DE RESULTADOS DE LA EVALUACIÓN') {
      this.graficasAsesoriaService.getIntegralEval().subscribe(data => {
        this.evaluacionIntegral(data, 'REPORTE INTEGRAL DE RESULTADOS DE LA EVALUACIÓN');
      });
    } else if (this.evalIntegral == 'REPORTE INTEGRAL POR MATERIA') {
      this.graficasAsesoriaService.getIntegralMate().subscribe(data => {
        this.evaluacionIntegral(data, 'REPORTE INTEGRAL POR MATERIA');
      });
    } else if (this.evalIntegral == 'REPORTE INTEGRAL POR CARRERA') {
      this.graficasAsesoriaService.getIntegralCarre().subscribe(data => {
        this.evaluacionIntegral(data, 'REPORTE INTEGRAL POR CARRERA');
      });
    }

  }

  graficaGenSol() {
    if (this.evalSolAte == 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN') {
      this.graficasAsesoriaService.getGeneralSol().subscribe(data => {
        this.general(data, 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN');
      });
    } else if (this.evalSolAte == 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN POR MATERIAS') {
      this.graficasAsesoriaService.getGeneralSolMat().subscribe(data => {
        this.generalBarra(data, 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN POR MATERIAS');
      });
    } else if (this.evalSolAte == 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN POR CARRERA') {
      this.graficasAsesoriaService.getGeneralSolCar().subscribe(data => {
        this.generalBarra(data, 'REPORTE GENERAL DE SOLICITUD Y ATENCIÓN POR CARRERA');
      });
    } else if (this.evalSolAte == 'REPORTE GENRAL DE ATENCIÓN POR CARRERA Y MATERIA') {
      this.graficasAsesoriaService.getGeneralSolCarMat().subscribe(data => {
        this.solicitudAtencion(data, 'REPORTE GENRAL DE ATENCIÓN POR CARRERA Y MATERIA');
      });
    }else if (this.evalSolAte == 'REPORTE INTEGRAL DE ATENCIÓN APROBADOS Y REPROBADOS') {
      this.graficasAsesoriaService.getGeneralAprRep().subscribe(data => {
        this.general(data, 'REPORTE INTEGRAL DE ATENCIÓN APROBADOS Y REPROBADOS');
      });
    }else if (this.evalSolAte == 'REPORTE INTEGRAL DE ATENCIÓN POR MATERIA APROBADOS VS REPROBADOS') {
      this.graficasAsesoriaService.getGeneralAprRepMat().subscribe(data => {
        this.generalBarra(data, 'REPORTE INTEGRAL DE ATENCIÓN POR MATERIA APROBADOS VS REPROBADOS');
      });
    }else if (this.evalSolAte == 'REPORTE DE ATENCIÓN POR CARRERA APROBADOS VS REPROBADOS') {
      this.graficasAsesoriaService.getGeneralAprRepCar().subscribe(data => {
        this.generalBarra(data, 'REPORTE DE ATENCIÓN POR CARRERA APROBADOS VS REPROBADOS');
      });
    }else if (this.evalSolAte == 'REPORTE DE ATENCIÓN POR CARRERA-MATERIA APROBADOS') {
      this.graficasAsesoriaService.getGeneralAprRepCarMat().subscribe(data => {
        this.solicitudAtencion(data, 'REPORTE DE ATENCIÓN POR CARRERA-MATERIA APROBADOS');
      });
    }
  }

}