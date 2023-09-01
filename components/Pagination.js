import Button from 'react-bootstrap/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './styles/Pagination.css'
import {useState} from 'react'


function Pagination(
    {
        currentPage,
        setCurrentPage,
        totalPages
        
    }
    )
    
    {
        // console.log('in Pagination...')
    const [disabledPrev,setDisabledPrev] = useState('')
    const [disabledNext,setDisabledNext] = useState('')
    const pageNumbers=[...Array(totalPages+1).keys()].slice(1)


    function nextPage() {
        if(currentPage!==totalPages) {
            setCurrentPage((prevPage)=>prevPage+1)
            setDisabledPrev('')
        } 
        else {
            setDisabledNext('disabled')
            
        }
    }
    function prevPage() {
        if(currentPage!==1) {
            setCurrentPage((prevPage)=>prevPage-1)
            setDisabledPrev('')
            setDisabledNext('')
        }
        else if(currentPage==1){
           setDisabledPrev('disabled')
        }

    }
    function handlePagination(e) {
        setCurrentPage(e.target.id)
        if(e.target.id==totalPages) {
            setDisabledNext('disbaled')
            setDisabledPrev('')
        }else {
            setDisabledPrev('')
        }
    }
    function toFirstPage() {
        setCurrentPage(1)
        setDisabledPrev('disabled')
        if(currentPage==totalPages) {
            setDisabledNext('')
        }
    }
    function toLastPage() {
        setCurrentPage(totalPages)
        setDisabledNext('disabled')
        if(currentPage===1) {
            setDisabledPrev('')
            setDisabledNext('')
        }
       
    }

    return(
        <>
    
        <ul className='page-container'>
            <div className='btn-container'>
            <li className='btn'><Button size='mb-2' variant='primary' onClick={toFirstPage} disabled={disabledPrev}><SkipPreviousIcon/></Button></li>
            <li className='btn'><Button size='mb-2'variant='primary' onClick={prevPage} disabled={disabledPrev}><ArrowBackIosIcon/></Button></li>
            {
                pageNumbers.map((page)=>{
                    return(
                        <li key={page} className='pages'><Button size='mb-2' className='btn' id={page} onClick={(e)=>handlePagination(e)}>{page}</Button></li>
                    )
                })
            }
            <li className='btn'><Button size='mb-2' variant="primary" onClick={nextPage} disabled={disabledNext}><ArrowForwardIosIcon/></Button></li>
            <li className='btn'><Button  size='mb-2'variant='primary'onClick={toLastPage} disabled={disabledNext}><SkipNextIcon/></Button></li>
            </div>
        </ul>
        
        </>
    )
}
export default Pagination