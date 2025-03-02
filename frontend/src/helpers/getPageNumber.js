export default function getPageNumber(page, totalPages) {
    const pageNumbers = []
    const maxPagesToShow = 5

    if(totalPages < maxPagesToShow || totalPages === maxPagesToShow) {
        for(let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i)
        }
    } else {
        pageNumbers.push(1)
        if(page > 3) pageNumbers.push('...')
        
        let startPage = Math.max(2, page - 1)
        let endPage = Math.min(totalPages - 1, page + 1)
        
        for(let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i)
        }

        if(page < totalPages - 2) pageNumbers.push('...')
        pageNumbers.push(totalPages)
    }

    return pageNumbers
}