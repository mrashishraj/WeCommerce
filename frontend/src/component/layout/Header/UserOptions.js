import React,{Fragment,useState} from 'react'
import "./Header.css"
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'

const UserOptions = () => {
    const [open, setOpen] = useState(false)

  return (
    <Fragment>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open={open}
        >

        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions