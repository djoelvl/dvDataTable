import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'DvDataTable',
  template: `
  <style>

  .table_button {
  background-color: #598BFF; /* Green */
  border: none;
  border-radius: 0.2rem;
  color: white;
  padding: 0.3rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
  .new_button {
  background-color: #7d9fee; /* Green */
  border: none;
  border-radius: 0.2rem;
  color: white;
  padding: 0.3rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 5rem;
  font-size: 14px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.new_button:hover{
  
    cursor: pointer;
    background-color: #598BFF;
    /* border: none; */
    /* border-color: #598BFF; */
    color: #ffffff;
    
    border: hidden;
}


.table_button:hover {
  background-color: white;
  color: #598BFF;
}

    .dv-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width:100%;
  border-spacing: 0;

}

.dv-table td, .dv-table th {
  border: 1px solid #ddd;
  padding:0.2rem;
  overflow: hidden;
  height:2rem;
  min-height:2rem
}

.dv-table tr:nth-child(even){background-color: #f2f2f2;}

.dv-table tr:hover {background-color: #ddd;}

.dv-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #598BFF;
  color: white;
}

    .tablePaginationButtons{
    width: 5rem;
    height: 2rem;
    margin: 0.5rem;
    cursor: pointer;
    background-color: #598BFF;
  
    color: #ffffff;
    border-radius: 0.2rem;

    border: hidden;
}

.tablePaginationButtons:hover{
    width: 5rem;
    height: 2rem;
    margin: 0.5rem;
    cursor: pointer;
    background-color: #7d9fee;
  
    color: #ffffff;
    border-radius: 0.2rem;

    border: hidden;
}

.tablePaginationButtons:disabled{
width: 5rem;height: 2rem;margin: 0.5rem;background-color:#F2F2F2;cursor:initial;border-color: #525252;border: groove;color: #c9c8c8;border-radius: 0.2rem;border: hidden;
}

.numberOfPageButtons{width: auto;
  min-width: 2rem;
  margin: 0.2rem;
  max-width: 6rem;
  height: 2rem;margin: 0.5rem;
  cursor: pointer;
  background-color: #b7c3df;
  color: #ffffff;
  border-radius: 0.2rem;
  border: hidden;
}
.numberOfPageButtons:hover{width: auto;min-width: 2rem;max-width: 6rem;height: 2rem;margin: 0.5rem;cursor: pointer;background-color: #598BFF; color: #ffffff;border-radius: 0.2rem;border: hidden;
}
.numberOfPageButtons:disabled{width: auto;height: 2rem;max-width: 6rem;margin: 0.5rem;background-color:#F2F2F2;cursor:initial;border-color: #525252;border: groove;color: #c9c8c8;border-radius: 0.2rem;border: hidden;
}

.searchButton{
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    height: 2rem;
    border: none;
    border-radius: 0.2rem;
    border-radius: 0.2rem;
    background-color: #EAEFF5;
}

.edit-inputs{
    height: 2rem;
    border: none;
    border-radius: 0.2rem;
    border-radius: 0.2rem;
    background-color: #EAEFF5;
}

.paginationSelect{
    margin-left: 0.5rem;
    width: 4rem;
    height: 1.5rem;
    border-color: #598BFF;
    border-radius: 0.2rem;
}

.noData{
    display: flex;
    justify-content: space-around;
    background: #EAEFF5;
    margin-bottom: 0.3rem;
}

.editButtonTb{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}
  </style>
  <br>
  <div style="padding: 1rem; font-family: Arial, Helvetica, sans-serif;" *ngIf="confirmNameButtons != true">
      <div>
      <br>
    <div>
      <br>
        <label for="">Records to display: </label>
        <select  class="paginationSelect" placeholder="Select Showcase" (selectstart)="paginado"
          (change)="paginationTable($event.target)">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    
        
      </div>
      <br>
    
      <div style="overflow-x:auto;">
        <table class="dv-table" [ngStyle]="{'margin': DatosPaginados.length==0?'0.01rem':''}">
          <thead class="table-primary">
          
            <tr >
             <th style="width:10%" *ngIf="(dataTableData.actions! != null &&dataTableData.actions! != undefined)|| (this.dataTableData.edit?.activate == true) || (this.dataTableData.delete?.activate == true)|| (this.dataTableData.add?.activate== true)"><div style="width:8rem;">Actions</div></th>
            <th *ngFor="let headers of dataTableData.headers">{{headers.description}}</th>
            </tr>
            <tr >
      
            <th *ngIf="dataTableData.add?.activate == true ||dataTableData.edit?.activate == true
            ||dataTableData.delete?.activate == true||dataTableData.actions != null || dataTableData.actions !=[] ">
            <button class="new_button" *ngIf="dataTableData.add?.activate == true" 
            (click)="addButton()" style="">{{dataTableData.add?.text}}
            <img [src]="dataTableData.add?.icon"  width="20" height="20">
            </button>
          </th>
            
            <th *ngFor="let headers of dataTableData.headers">
            <input  class="edit-inputs" (input)="filterTable($event,headers)"/> 
            </th>
            </tr> 
          </thead>

          <tbody *ngIf="DatosPaginados.length == 0 && isAdding == true">
          <tr *ngIf="isAdding == true">
          <td>
          <button class="table_button"  (click)="AddObject()" style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
          {{dataTableData.confirm?.text != null && dataTableData.confirm?.icon == null? dataTableData.confirm?.text:""}}<img *ngIf="dataTableData.confirm?.icon != null" [src]="dataTableData.confirm?.icon"  width="24" height="24">
                </button>
                <button (click)="isAdding = false && addObject = {}" class="table_button"  style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
                {{dataTableData.cancel?.text != null && dataTableData.cancel?.icon == null? dataTableData.cancel?.text:""}}<img *ngIf="dataTableData.cancel?.icon != null" [src]="dataTableData.cancel?.icon"  width="24" height="24">

                </button>
          </td> 
          <td *ngFor="let key of keys ">
          <input class="edit-inputs" (input)="onAddingObject($event,key.propertie)"  [type]="key.type"/> 
          </td>
          
          </tr>
          </tbody>


          <tbody *ngIf="DatosPaginados.length > 0">
            
          <tr *ngIf="isAdding == true">
          <td>
          <button class="table_button"  (click)="AddObject()" style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
          {{dataTableData.confirm?.text != null && dataTableData.confirm?.icon == null? dataTableData.confirm?.text:""}}
          {{dataTableData.confirm == undefined? "Confirm":""}}
          <img *ngIf="dataTableData.confirm?.icon != null" [src]="dataTableData.confirm?.icon"  width="24" height="24">
                </button>
                <button (click)="isAdding = false && addObject = {}" class="table_button"  style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
                {{dataTableData.cancel?.text != null && dataTableData.cancel?.icon == null? dataTableData.cancel?.text:""}}<img *ngIf="dataTableData.cancel?.icon != null" [src]="dataTableData.cancel?.icon"  width="24" height="24">

                </button>
          </td> 
          <td *ngFor="let key of keys ">
          <input class="edit-inputs" (input)="onAddingObject($event,key.propertie)"  [type]="key.type"/> 
          </td>
          
          </tr>
            <tr  *ngFor="let datos of DatosPaginados[pageNumber]">
            <td style="display: flex;justify-content: center;height: 2.5rem;" *ngIf="(dataTableData.actions! != undefined && dataTableData.actions! != null)|| (this.dataTableData.edit?.activate == true) || (this.dataTableData.delete?.activate == true)|| (this.dataTableData.add?.activate == true)">
            <div style="display: flex;" *ngIf="datos.identifycateIfIsEditing == false">
            <button class="table_button" (click)="outputItemValue(datos,actions.name)" *ngFor="let actions of dataTableData.actions">
                {{actions.description != null && actions?.icon == null? actions.description:""}}<img *ngIf="actions.icon != null" [src]="actions?.icon"  width="24" height="24">
                </button>
                </div>    
                <div style="display: flex;" *ngIf="datos.identifycateIfIsEditing == false">
                <button class="table_button" (click)="edit(datos)" *ngIf="dataTableData.edit?.activate == true" style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
                {{dataTableData.edit?.text != null && dataTableData.edit?.icon == null? dataTableData.edit?.text:""}}<img *ngIf="dataTableData.edit?.icon != null" [src]="dataTableData.edit?.icon"  width="24" height="24">

                </button>
                <button class="table_button" (click)="onDelete(datos)" *ngIf="dataTableData.delete?.activate == true" style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
                {{dataTableData.delete?.text != null && dataTableData.delete?.icon == null? dataTableData.delete?.text:""}}<img *ngIf="dataTableData.delete?.icon != null" [src]="dataTableData.delete?.icon"  width="24" height="24">
                </button>
                </div>
               <div *ngIf="datos.identifycateIfIsEditing == true">
               <button class="table_button" (click)="confirmEdit(datos)"  style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
               {{dataTableData.confirm?.text != null && dataTableData.confirm?.icon == null? dataTableData.confirm?.text:""}}
               {{dataTableData.confirm == undefined? "Confirm":""}}
               <img *ngIf="dataTableData.confirm?.icon != null" [src]="dataTableData.confirm?.icon"  width="24" height="24">
                </button>
                <button class="table_button" (click)="cancelEdit(datos)" style="margin-left:0.5rem;margin-rigth:0.5rem" nbButton >
                {{dataTableData.cancel?.text != null && (dataTableData.cancel?.icon == (null||undefined||""||''))? dataTableData.cancel?.text:""}}
               {{dataTableData.cancel == undefined? "Cancel":""}}
                <img *ngIf="dataTableData.cancel?.icon != null" [src]="dataTableData.cancel?.icon"  width="24" height="24">
                </button>
               </div>

              
            </td>
              <td *ngFor="let key of keys ">
                {{datos.identifycateIfIsEditing == false? datos[key.propertie]:""}}
              <input  class="edit-inputs" (input)="inputValues($event,key.propertie,datos,key.type)" [value]="datos[key.propertie]"  [type]="key.type" *ngIf="datos.identifycateIfIsEditing == true"/> 
            </td>

            </tr>
  
          </tbody>
  
        </table>
      </div>
        <div *ngIf="DatosPaginados.length == 0" class="noData"><h4 style="margin: 0;">No data to display.</h4></div>
        <div *ngIf="DatosPaginados.length > 0">
          <div style="float: right;">
            <button [disabled]="pageNumber==0" class="numberOfPageButtons" (click)="numberOfPage('first')"   >
              <<
            </button>
              <button [disabled]=""  class="numberOfPageButtons" name="pageNumber" (click)="numberOfPage(page,$event)"  [id]="'pageButtons' + page" *ngFor="let page of paginatedNumber" [ngStyle]="{'display': DatosPaginados.length>=page?'':'none'}">
                {{page}}
              </button>
              <button [disabled]="pageNumber ==DatosPaginados.length-1 " class="numberOfPageButtons" (click)="numberOfPage('last')"  >
                >>
              </button>
              <br>
              <div>
              <div style="float: right;">
            <label for="">Showing: {{showing}} of {{Datos.length>paginationForTable?DatosPaginados.length * paginationForTable:Datos.length}}
              registers.</label>
            
              </div>
              <br>
            <br>
             
        </div>
          </div>
        </div>
        </div>
  `  ,
  styles: []
})
export class DvDataTableComponent implements OnInit {

  Datos: any[] = []
  editingObject: any = {}
  DatosFiltrados: any[] = []
  almacenarDatos: any[] = []
  confirmNameButtons:boolean = false
  identifycateRow: any
  DatosPaginados: any[] = []
  paginatedNumber: any[] = [1, 2, 3, 4, 5]
  searchString: string = ""
  paginado: string = '10'
  isAdding: boolean = false
  paginationForTable!: number
  editBody: any[] = []
  keys: any[] = []
  showing!: number
  addObject: any = {}
  isEditing: boolean = false
  pageNumber: number = 0
  paginacionCounter: number = 0
  @Input() dataTableData!: dataTableData;
  @Output() outputItem = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  outputItemValue(value: any, button: any) {
    value.buttonClickedIdentifier = button
    this.outputItem.emit(value);
  }

  onAddingObject(event: any, key: any) {
    debugger
    this.addObject[key] = event.target.value
  }

  addButton() {
    this.isAdding = true;

  }

  AddObject() {
    if (this.addObject != {}) {
      this.Datos.unshift(this.addObject)
      this.addObject = {}
      this.isAdding = false
      this.paginationTable()
    }
  }
  onDelete(object: any) {

    var index = this.Datos.findIndex((x: any) => x == object)
    this.Datos.splice(index, 1)
    this.paginationTable()
  }

  edit(object: any) {

    object.identifycateIfIsEditing = true
    if (this.editBody.find((x: any) => x.data.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray) == undefined) {
      var data: any = {
        data: JSON.parse(JSON.stringify(object)),
        newData: JSON.parse(JSON.stringify(object))
      }
      data.data.identifycateIfIsEditing = false
      data.newData.identifycateIfIsEditing = false
      this.editBody.push(data)
    }
  }

  confirmEdit(object: any) {
    var index = this.editBody.findIndex((x: any) => x.data.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray);
    var index2 = this.DatosPaginados[this.pageNumber].findIndex((x: any) => x.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray);
    this.DatosPaginados[this.pageNumber][index2] = this.editBody[index].newData;
    var index3 = this.Datos.findIndex((x: any) => x.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray);
    this.Datos[index3] = this.editBody[index].newData;
    this.editBody.splice(index, 1);
  }

  cancelEdit(object: any) {
    debugger
    object.identifycateIfIsEditing = false
    var index = this.editBody.findIndex((x: any) => x.data.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray)
    var index2 = this.DatosPaginados[this.pageNumber].findIndex((x: any) => x.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray)
    this.DatosPaginados[this.pageNumber][index2] = this.editBody[index].data
    this.editBody.splice(index, 1)
  }

  inputValues(value: any, key: any, object: any, type: any) {
    debugger
    var index = this.editBody.findIndex((x: any) => x.data.wayToIdentifyARowInTheArray == object.wayToIdentifyARowInTheArray)
    this.editBody[index].newData[key] = value.target.value


  }


  ngOnChanges() {
    
    this.Datos = this.dataTableData.body
    this.confirmTextOfActionsButtons(this.dataTableData)
    debugger
    this.dataTableData.actions?.forEach((x,index,arr)=>{
      var filter = arr.filter(z=>z.name == x.name).length
      if(filter>1){
        this.confirmNameButtons = true
        throw new Error(`The table dvDataTable can't accept multiple actions with the same value in name property. Value with the error: ${x.name}`);
      }
    })
   
    if(this.confirmNameButtons==false){
    var key = Object.keys(this.Datos[0])
    if (this.dataTableData.headers == (null || undefined) || this.dataTableData.headers.length == 0) {
      this.dataTableData.headers = []
      key.forEach(x => {
        var keysObject = {
          propertie: x,
          type: 'text',
          description: x
        }
        this.dataTableData.headers?.push(keysObject)
        this.keys.push(keysObject)
      })

    }
    else {
      this.dataTableData.headers?.forEach(x => {
        this.keys.push(x)
      })
    }
    this.paginationTable()
  }
  }

  confirmTextOfActionsButtons(body: any) {


    if (body.cancel) {
      if (body.cancel.text == null || body.cancel.text == undefined || body.cancel.text == "" || body.cancel.text == '') {
        body.cancel = 'Cancel'

      }
    }
    if (body.edit) {
      if (body.edit.text == null || body.edit.text == undefined || body.edit.text == "" || body.edit.text == '') {
        body.edit.text = 'Edit'

      }
    }
    if (body.add) {
      if (body.add.text == null || body.add.text == undefined || body.add.text == "" || body.add.text == '') {
        body.add.text = 'New'

      }
    }
    if (body.confirm) {
      if (body.confirm.text == null || body.confirm.text == undefined || body.confirm.text == "" || body.confirm.text == '') {
        body.confirm = 'Confirm'

      }
    }
    if (body.delete) {
      if (body.delete.text == null || body.delete.text == undefined || body.delete.text == "" || body.delete.text == '') {
        body.delete = 'Delete'

      }
    }
  }

  ngAfterViewInit() {
    document.getElementById(`pageButtons${1}`)!.style.backgroundColor = "#598BFF"

  }

  paginationTable(event?: any) {
    debugger



    if (event != null) {
      if (event.value != null) {
        this.paginado = event.value || '10'
      }
      else {
        this.paginado = event || '10'
      }
    }
    if (this.Datos.length > Number(this.paginado)) {
      this.showing = Number(this.paginado)
      this.paginationForTable = Number(this.paginado)

    }
    else {
      this.showing = this.Datos.length
      this.paginationForTable = Number(this.paginado)

    }

    this.almacenarDatos = []
    this.paginacionCounter = 0
    this.pageNumber = 0
    this.DatosPaginados = []
    var counter = 0
    this.Datos.forEach(x => {
      counter = counter + 1
      x.identifycateIfIsEditing = false
      x.wayToIdentifyARowInTheArray = this.paginacionCounter
      this.paginacionCounter++;

      this.almacenarDatos.push(x)
      if (this.paginacionCounter == Number(this.paginado)) {
        this.paginacionCounter = 0
        this.DatosPaginados.push(this.almacenarDatos)
        this.almacenarDatos = []

      }
      else if (this.Datos.length < Number(this.paginado)) {

        if (this.paginacionCounter == this.Datos.length) {
          this.paginacionCounter = 0
          this.paginationForTable = counter
          this.DatosPaginados.push(this.almacenarDatos)
          this.almacenarDatos = []

        }
      }
      else if (counter == this.Datos.length) {
        this.paginacionCounter = 0
        this.paginationForTable = counter
        this.DatosPaginados.push(this.almacenarDatos)
        this.almacenarDatos = []
      }

    })
  }






  filterTable(event?: any, object?: any) {
    debugger
    if (this.isAdding == true) {
      this.addObject = {}
      this.isAdding = false
    }
    if (event != undefined) {
      this.searchString = event.target.value

    } else {
      this.searchString = ""
    }

    if (this.searchString != null && this.searchString != "") {

      this.almacenarDatos = []
      var DatosFiltrados: any = []
      this.paginacionCounter = 0
      this.pageNumber = 0
      var counter = 0
      this.DatosPaginados = []
      var filter = this.Datos.filter((y: any) => String(y[object.propertie]).toLowerCase().includes(this.searchString.toLowerCase()))
      debugger
      if (filter.length > 0) {
        filter.forEach(z => {
          counter = counter + 1
          z.identifycateIfIsEditing = false
          z.wayToIdentifyARowInTheArray = this.paginacionCounter
          DatosFiltrados.push(z)
          this.almacenarDatos.push(z)
          this.paginacionCounter++;


          if (filter.length < Number(this.paginado)) {
            if (this.paginacionCounter == filter.length) {
              this.paginacionCounter = 0
              this.showing = filter.length
              this.paginationForTable = filter.length
              this.DatosPaginados.push(this.almacenarDatos)
              this.almacenarDatos = []

            }
          } else {
            if (this.paginacionCounter == Number(this.paginado)) {
              this.paginacionCounter = 0
              this.showing = Number(this.paginado)
              this.DatosPaginados.push(this.almacenarDatos)
              this.almacenarDatos = []
            }
            else if (counter == this.Datos.length) {
              this.paginacionCounter = 0
              this.paginationForTable = counter
              this.DatosPaginados.push(this.almacenarDatos)
              this.almacenarDatos = []
            }
          }
        })


        document.getElementById(`pageButtons${1}`)!.style.backgroundColor = "#598BFF"

      }

    }
    else {
      this.paginationTable(this.paginado)
    }

  }

  numberOfPage(event?: any, button?: any) {
    debugger
    this.paginatedNumber.forEach(x => {
      document.getElementById(`pageButtons${x}`)!.style.backgroundColor = "#b7c3df"
    })

    if (event == 'last') {

      this.pageNumber = this.DatosPaginados.length - 1
      if (this.DatosPaginados.length >= 100) {
        this.paginatedNumber = [this.pageNumber - 3, this.pageNumber - 2, this.pageNumber - 1, this.pageNumber, this.pageNumber + 1]
      }
      else if (this.DatosPaginados.length >= 6) {
        this.paginatedNumber = [this.pageNumber - 3, this.pageNumber - 2, this.pageNumber - 1, this.pageNumber, this.pageNumber + 1]

      }
      else {
        this.paginatedNumber = [1, 2, 3, 4, 5]
      }
      this.showing = this.DatosPaginados.length * Number(this.paginado)
      if (this.showing > this.Datos.length) {
        this.showing = this.Datos.length
      }
    }
    else if (event == 'first') {
      this.pageNumber = 0
      this.paginatedNumber = [1, 2, 3, 4, 5]
      this.showing = Number(this.paginado)

    }
    else {
      this.pageNumber = Number(event) - 1
      if (event == 1) {
        this.paginatedNumber = [1, 2, 3, 4, 5]

      }
      else if (event == this.paginatedNumber[this.paginatedNumber.length - 1]) {
        this.paginatedNumber = [this.pageNumber - 2, this.pageNumber - 1, this.pageNumber, this.pageNumber + 1, this.pageNumber + 2]
      }
      else if (event == this.paginatedNumber[0]) {
        this.paginatedNumber = [this.pageNumber, this.pageNumber + 1, this.pageNumber + 2, this.pageNumber + 2, this.pageNumber + 3]
      }
      this.showing = event * Number(this.paginado)
      if (this.showing > this.Datos.length) {
        this.showing = this.Datos.length
      }
      document.getElementById(button.target.id)!.style.backgroundColor = "#598BFF"
    }
  }

  deleteButton(item: any, row: any) {
    this.DatosFiltrados.splice
  }


}

export interface dataTableData {
  headers?: headers[],
  body?: any,
  actions?: actionButton[],
  edit?: principalActionButton,
  add?: principalActionButton,
  cancel?: principalActionButton,
  confirm?: principalActionButton,
  delete?: principalActionButton
}

export interface principalActionButton {
  activate?: boolean,
  icon?: string,
  text?: string
}

export interface actionButton {
  icon?: string,
  name?: string,
  description?: string
}



export interface headers {
  propertie?: string,
  type?: string
  description?: string
}








