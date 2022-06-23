import React from 'react'
import { Paper,Button } from '@material-ui/core'
import { createStyles ,makeStyles, Theme} from '@material-ui/core/styles';



const useStyles = makeStyles( (theme:Theme)=>
   createStyles({
       main:{
           marginBottom:'20px'
       },
       root:{
           flexGrow:1
       },
       paperContent:{
           display: 'flex',
           alignItems:'center',
           justifyContent:'space-between',
          padding: '0px 5px'
       },
       headings: {
           fontWeight: 'bold',
       //     marginLeft:'30px',
           // lineHeight: '1.6'
       }
   })
)

function Header(props:any) {
    const classes = useStyles();
    const name = props.name;
  
    
  return (

    <div className={classes.main}>
    <Paper >
        <div className={classes.paperContent}>
        <h2>{name}</h2>
        
        
            <Button
                variant='contained'
                color='primary'
                onClick={()=>{props.callOpen(true)}}
            >Create</Button>
        
        </div>
    </Paper>
    </div>
  )
}

export default Header;