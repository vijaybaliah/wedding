import React from 'react'
import { range } from 'lodash'
import PropTypes from 'prop-types'
import ChevronLeft from '../../Icons/ChevronLeft'
import ChevronRight from '../../Icons/ChevronRight'
import styles from '../../App.css'

const propTypes = {
    currentPage: PropTypes.number,
    totalSize: PropTypes.number.isRequired,
    sizePerPage: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    sizes: PropTypes.array,
    showSize: PropTypes.bool
}

const defaultProps = {
    currentPage: 1,
    showSize: true,
    sizePerPage: 10,
    sizes: range(10).map(size => (size + 1) * 10)
}

class Pagination extends React.Component {
    
    updatePage = (page) => {
        const totalPages = Math.ceil(this.props.totalSize/this.props.sizePerPage)
        const sizePerPage = this.props.sizePerPage
        if (page > 0 && page <= totalPages) {
            this.props.onChange(page, {sizePerPage: sizePerPage})
        }
    }

    onPageChange = (e) => {
        this.updatePage(parseInt(e.target.value, 10))
    }

    onSizeChange = (e) => {
        const value = parseInt(e.target.value, 10)
        this.props.onChange(1, {sizePerPage: value})
    }

    render () {
        const totalPages = Math.ceil(this.props.totalSize/this.props.sizePerPage)
        const pages = range(1, totalPages + 1).map(page => page)

        const start = (this.props.currentPage - 1) * this.props.sizePerPage + 1
        const end = this.props.totalSize < (start + this.props.sizePerPage - 1)? this.props.totalSize: (start + this.props.sizePerPage - 1)
        return (
            <div className={"container middle]"}>
                {this.props.showSize? (<div className={"showSize container middle"}>
                    <span>Tags per page:</span>
                    <div className={"dropdownContainer"}>
                        <select className={"customSelectTag"} value={this.props.sizePerPage} onChange={this.onSizeChange}>
                            {
                                this.props.sizes.map((sizeList) => {
                                return (
                                    <option value={sizeList} key={sizeList}>{sizeList}</option>
                                )
                               }) 
                            }
                        </select>
                        <div className={"selectTagPointer"}>
                        </div>
                    </div> 
                    <span className={"sizeLabel"}>
                        {`${start} to ${end}`}
                    </span>
                    <span>{`of ${this.props.totalSize}`}</span>
                </div>): null}
                <span className={"paginationArrow"} onClick={() => this.updatePage(this.props.currentPage - 1)}>
                    <ChevronLeft />
                </span>
                <select className={"customSelectTag selectPage"} value={this.props.currentPage} onChange={this.onPageChange}>
                    {
                        pages.map((pageList) => {
                            return (
                                <option value={pageList} key={pageList}>{pageList}</option>
                            )
                        })
                    }
                </select>
                <span className={"paginationArrow" } onClick={() => this.updatePage(this.props.currentPage + 1)}>
                    <ChevronRight />
                </span>
            </div>
        )
    }
}

Pagination.propTypes = propTypes
Pagination.defaultProps = defaultProps
export default Pagination