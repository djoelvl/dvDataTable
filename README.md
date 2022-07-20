# DvDataTable

DvDataTable is a table with pagination, filters and more features.
## Github
[DvDataTable](https://github.com/djoelvl/dvDataTable)
## Installation

Use the package manager to install the library of the table:

```bash
npm i dvdatatable
```

## Usage

#### In the module in which you will use the table you must import the library as follows:

```typescript
import { DvDataTableModule } from 'dvdatatable';

@NgModule({
  imports: [
    CommonModule, 
    DvDataTableModule
    

  ],
  declarations: [ExampleComponent]
})
export class Example{ }
```
#### Once this is done, in order to use the table you must do the following in the template of the component in which you want to use it:
```html
<DvDataTable>
</DvDataTable>
```
#### And now to set data into the table you can do this:
Template of the component: 
```typescript
<DvDataTable [dataTableData]="data">
</DvDataTable>

//data is an example of a variable to pass data to the table
```
component typescript file:
```typescript
export class AppComponent implements OnInit {
 
  data:dataTableData = {}

  constructor(){}

  ngOnInit(): void {
  data = {
        body:[{
      example: 1,
      saludos: 'example'
             }]
         }
  }

```
#### After this the table will be rendered showing the array that you sent with the properties as headers

## Custom headers
#### To only display a property of your object you need to do the following:
```typescript
/*Remember so that the table can render using the 
defined headers, the properties in the header must be equal
 to one of the properties of the array with the data of the table*/

export class AppComponent implements OnInit {
 
  data:dataTableData = {}

  constructor(){}

  ngOnInit(): void {
  data = {
        headers:[{
               propertie: "example", //set the name of the propertie
               type: "text", //Assigns the value type to the property
               description:"Example" //Assign what will be displayed in the table column
                }],
        body:[{
           example: 1,
           saludos: 'example'
             }]
         }
  }

```

## Actions buttons
#### To use the defaults actions buttons of the table you can do this:

```typescript
//For a more satisfactory experience, I recommend using SVG images for the icons.
export class AppComponent implements OnInit {
 
  data:dataTableData = {}

  constructor(){}

  ngOnInit(): void {
  data = {
        headers:[{
               propertie: "example", 
               type: "number", 
               description:"Example" 
                }],
        body:[{
           example: 1,
           saludos: 'example'
             }],
       edit:{
            activate:true, //This property defines if the button will be active or not.
            text:"Edit", //This property defines what will be displayed in the button text if no icon is assigned to it.
            icon:"" //This property expects a path of some image to be able to use it as the icon of the button.
             },
       add:{
            activate:true,
            text:"Add",
            icon:""
             },
       delete:{
        activate:true,
            text:"Delete",
            icon:""
           }
         }
  }

```
## Customs actions buttons
#### To use customs actions buttons in the table you can do this:

```typescript
//For a more satisfactory experience, I recommend using SVG images for the icons.
export class AppComponent implements OnInit {
 
  data:dataTableData = {}

  constructor(){}

  ngOnInit(): void {
  data = {
        headers:[{
               propertie: "example", 
               type: "number", 
               description:"Example" 
                }],
        body:[{
           example: 1,
           saludos: 'example'
             }],
        actions:[{
             description:"Hola", //This property defines what will be displayed in the button text if no icon is assigned to it.
             name:"Hola", //This property set a identifier in the button
             icon:"" //This property expects a path of some image to be able to use it as the icon of the button.
                }]
                }
      }
  }

//All custom buttons return the array object in the table row they are in. In future versions we will improve this.
```
###

#### To get the returned object you must do the following:

```html
<DvDataTable [dataTableData]="data" (outputItem)="output(#event)">
</DvDataTable>
```

```typescript
//For a more satisfactory experience, I recommend using SVG images for the icons.
export class AppComponent implements OnInit {
 
  data:dataTableData = {}

  constructor(){}

  ngOnInit(): void {
  data = {
        headers:[{
               propertie: "example", 
               type: "number", 
               description:"Example" 
                }],
        body:[{
           example: 1,
           saludos: 'example'
             }],
        actions:[{
             description:"Hola", 
             name:"Hola", 
             icon:"" 
                }]
                }
      }

    output(object:any) {
       console.log(object)
                      }
}

```
