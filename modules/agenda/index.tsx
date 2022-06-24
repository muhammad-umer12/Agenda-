import  React,{useState} from 'react'
import { Paper,Button } from '@material-ui/core'
import { DataGrid } from '@mui/x-data-grid';
import Header from '../../shared/Header/header'
import Create from './create'
import Papa from "papaparse";

import { CSVLink } from "react-csv";


function Index() {

    const [open,setOpen] = useState(false);
    const [selected,setSelected] = useState({});
    const row = [
        {
            id:0,
            title:"Standhup meeting",
            description:"To discuss daily tasks",
            status:"pending",
            time: new Date().toUTCString()
        },
        {
            id:1,
            title:"Standhup meeting",
            description:"To discuss daily tasks",
            status:"pending",
            time: new Date().toUTCString()
        },
        {   id:2,
            title:"Standhup meeting",
            description:"To discuss daily tasks",
            status:"pending",
            time: new Date().toUTCString()
        }
    ]

    const columns = [
        {
            
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: true,
        },
        {
            
            field: 'time',
            headerName: 'Time',
            width: 150,
            editable: true,
        },
        {
            
            field: 'status',
            headerName: 'Status',
            width: 150,
            editable: true,
        },
        {   
            field: 'action',
            headerName: 'Action',
            width: 150,
            editable: true,
            renderCell : (rows:any)=> {
               return(
                    <>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={()=>{onDelete(rows?.id)}}
                    >
                        Delete
                    </Button>
                  
                </>
               )
            }
        },
    ]

    const [rows,setRows] = useState<any>([
        // {
        //     id:0,
        //     title:"Standhup meeting",
        //     description:"To discuss daily tasks",
        //     status:"pending",
        //     time: new Date().toUTCString()
        // },
        // {
        //     id:1,
        //     title:"Standhup meeting",
        //     description:"To discuss daily tasks",
        //     status:"pending",
        //     time: new Date().toUTCString()
        // },
        // {   id:2,
        //     title:"Standhup meeting",
        //     description:"To discuss daily tasks",
        //     status:"pending",
        //     time: new Date().toUTCString()
        // }

    ])
    
    const AddAgenda = (data:any)=>{
        
        let values = data;
        values.id= rows.length;
       values.time =  new Date(values.time).toUTCString()
        setRows([...rows,values])
    }

    const callOpen = ()=>
    {
       
        setOpen(true);
    }
    const onClose = ()=>
    {
        setOpen(false)
    }

    const onDelete = (id:any)=>{
    
        let temp = [...rows];
        temp.splice(id,1);
        setRows(temp)


    }


  return (
      <>
      <Header name={'Agneda List'} callOpen={callOpen}/>
      <Paper>
      <div style={{padding:'10px'}}>
       
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
              complete: function(results) {
                

                let data:any[]=results.data;
                let arr:any = [];
                let keys = data[0];
                for(var i=1;i<data.length;i++)
                {
                    let entry:any = {};
                    data[i].map((e:any,index:any)=>{

                        entry[keys[index]]= e
                    })
                    arr.push(entry)
                    // for(var j=0; j<data[i].length;j++)
                    // {
                    //     entry[data[0]]: data[i];
                    // }
                }
                setRows(arr);
                //console.log("Finished:", arr);
              }}
            )
          }
        }}
      />
    
    </div>
      <div style={{ height: 400, width: '100%',padding:'10px 0px' }}>
     <Button style={{ margin:'10px 10px'}}
        variant="outlined"
        color="secondary"><CSVLink data={rows}>Export</CSVLink> </Button>   
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      </div>
      </Paper>

        {
            open &&  <Create open={open} onClose={setOpen} AddAgenda={AddAgenda} />
        }
       
      
      </>
    
  )
}

export default Index;