import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DiagnosticoService } from '../diagnostico.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show-diagnostico',
  templateUrl: './show-diagnostico.component.html',
  styleUrls: ['./show-diagnostico.component.css']
})
export class ShowDiagnosticoComponent implements OnInit {

  @ViewChild('contenido') contenido!: ElementRef;
  persona:any;
  cita:any;
  diagnostico:any;
  medicamentos:any;

  constructor(private diagnosticoService: DiagnosticoService,
    private router: Router) {
      if(this.router.getCurrentNavigation()?.extras?.state){
        this.persona = this.router.getCurrentNavigation()?.extras?.state?.['persona'];
        this.cita = this.router.getCurrentNavigation()?.extras?.state?.['cita'];
      }
    }

  ngOnInit(): void {
    this.diagnosticoService.getDiagnostico(this.cita.id).subscribe(res =>{
      if(res.status){
        this.diagnostico = res.diagnostico;
        this.medicamentos = res.medicamentos;
      }
    });
  }
  
  onRegresar(){
    this.router.navigate(['/cita'],{state: {persona: this.persona}});
  }

  onPDF(){
    html2canvas(document.querySelector('#contenido')!).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p','mm','a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataUrl, 'PNG',0,0, width, height);
      pdf.output('dataurlnewwindow',{filename: 'diagnostico.pdf'});
    })
    // const doc = new jsPDF('p','pt','a4');
    // doc.html(this.contenido.nativeElement,{
    //   callback: (pdf) =>{
    //     pdf.output('dataurlnewwindow');
    //   },
    //   margin: 15
    // })
  }

}
