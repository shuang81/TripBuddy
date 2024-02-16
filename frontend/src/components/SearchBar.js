import React, {useState, useEffect} from 'react'
import { Form, Button, Container, Dropdown, FormSelect } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'


const SearchBar = ({categories, selectedCategory, setSelectedCategory, setKeyword, keyword, search}) => {

  return (
    <div className={styles['search-bar']}>
        <Form.Control
              type="search"
              placeholder="Search posts by destinations"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          <Button variant="success">Search</Button>

          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value={""}>Categories</option>
                {
                    categories?.map((cat) => {
                        return <option key={cat} value={cat}>{cat}</option>
                    })
                }
        </select>
    </div>
  )
}

export default SearchBar