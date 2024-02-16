import React, {useState} from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'

const ContentProviders = ({contentProviders, selectedContentProviders, setSelectedContentProviders}) => {
    
    const handleCheckboxChange = (event) => {
        const checked = event.target.checked
        const contentProviderId = event.target.value
        if (checked){
            setSelectedContentProviders([...selectedContentProviders, contentProviderId])
        } else {
            setSelectedContentProviders(selectedContentProviders.filter((id) => id != contentProviderId))
        }
    }

    return (
        <div className={styles['content-providers-block']}>
            <h6>Following:</h6>
            <>
                {contentProviders.length > 0 
                
                ? contentProviders?.map((contProvider) => {
                    return (<div key={contProvider?._id}>
                        <input
                        value={contProvider?._id}
                        className='form-check-input me-2'
                        type="checkbox"
                        onChange={(e) => handleCheckboxChange(e)}
                        />
                        <label className="form-check-label" >{contProvider?.username}</label>
                    </div>)
                }) 
                : 
                <div>
                    <h6 className='text-secondary mt-5'>You are currently not following any content providers</h6>

                </div>
                }
            </>
            
        </div>
    )
}

export default ContentProviders