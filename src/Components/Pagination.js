import './Pagination.css'
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Pagination({
    currentPage,
    totalPages,
    handlePagesClick,
    handleToFirstPageClick,
    handleToLastPageClick,
    handlePrevPageClick,
    handleNextPageClick
}) {

    function createButtonsForPagesInPagination() {
        let buttons=[]
        for(let pageNumber = 1;pageNumber<=totalPages;++pageNumber) {
            buttons.push(
                <button
                    key={pageNumber}
                    id={pageNumber}
                    onClick={(e)=>handlePagesClick(e.target.id)}
                    className={currentPage===pageNumber?'button-page':null}
                >
                  {pageNumber}  
                </button>
            )
        }
        return buttons
    }

    return(
        <div className='container'>
            <button
                onClick={handleToFirstPageClick}
                className={currentPage===1?'disable':null}
            >
                <FirstPageIcon/>
            </button>
            <button
                onClick={handlePrevPageClick}
                className={currentPage===1?'disable':null}
            >
                <ArrowBackIosNewIcon sx={{ fontSize: 16 }}/>
            </button>

                {createButtonsForPagesInPagination()}

            <button
                onClick={handleNextPageClick}
                className={currentPage===totalPages?'disable':null}
            >
                <ArrowForwardIosIcon sx={{ fontSize: 16 }}/>
            </button>
            <button
                onClick={handleToLastPageClick}
                className={currentPage===totalPages?'disable':null}
            >
                <LastPageIcon/>
            </button>
        </div>
    )
}
export default Pagination