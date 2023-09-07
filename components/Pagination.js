import Button from 'react-bootstrap/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Container from 'react-bootstrap/Container';
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
    const [disabledPrev,setDisabledPrev] = useState('')
    const [disabledNext,setDisabledNext] = useState('')
    const pageNumbers=[...Array(totalPages+1).keys()].slice(1)

    function removeExtremePrevButtonsFromDisable() {
        setDisabledPrev('')
        return
    }

    function removeExtremeNextButtonsFromDisbale() {
        setDisabledNext('')
        return
    }

    function disablePrevAndToFirstButtons() {
        setDisabledPrev('disabled')
        return
    }
    function disableNextAndToLastButtons() {
        setDisabledNext('disable')
        return
    }
    function removeExtremeButtonsFromDisable() {
        setDisabledNext('')
        setDisabledPrev('')
        return
    }
    function handlePagesExceptFirstAndLast(e) {
        setCurrentPage((prevPage)=>{
            if(prevPage>e.target.id) {
                return prevPage-(prevPage-e.target.id)
            } else {
                return prevPage+(e.target.id-prevPage)
            }
        })
        removeExtremeButtonsFromDisable()
        return
    }
    function handlePagination(e) {
        if(e.target.id==1) {
            disablePrevAndToFirstButtons()
            removeExtremeNextButtonsFromDisbale()
            return
        }
        else if(e.target.id==totalPages) {
            disableNextAndToLastButtons()
            removeExtremePrevButtonsFromDisable()
            return
        }
        else {
            handlePagesExceptFirstAndLast(e)
        }
    }
    function toFirstPage() {
        setCurrentPage(1)
        disablePrevAndToFirstButtons()
        removeExtremeNextButtonsFromDisbale()
       
    }
    function prevPage() {
        if(currentPage==1) {
            disablePrevAndToFirstButtons()
            removeExtremeNextButtonsFromDisbale()
        }
        else {
            setCurrentPage((prevPage)=>prevPage-1)
            removeExtremePrevButtonsFromDisable()
            removeExtremeNextButtonsFromDisbale()
        }
    }
    function toLastPage() {
        setCurrentPage(totalPages)
        disableNextAndToLastButtons()
        removeExtremePrevButtonsFromDisable()
    }
    function nextPage() {
        if(currentPage==totalPages) {
            disableNextAndToLastButtons()
            removeExtremePrevButtonsFromDisable()
        }
        else {
            setCurrentPage((prevPage)=>prevPage+1)
            removeExtremeNextButtonsFromDisbale()
            removeExtremePrevButtonsFromDisable()
        }
    }

    return(
        <>
    
        <ul className='page-container'>
            <div className='btn-container'>
            <li className='btn'><Button size='mb-2' variant='primary' onClick={toFirstPage} disabled={disabledPrev} ><SkipPreviousIcon/></Button></li>
            <li className='btn'><Button size='mb-2'variant='primary' onClick={prevPage} disabled={disabledPrev} ><ArrowBackIosIcon/></Button></li>
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