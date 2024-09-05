import React, { useState, useEffect } from 'react';

function EditInfoPage() {
    const [infoPage, setInfoPage] = useState('BusinessFundingPage');
    const [infoTitle, setInfoTitle] = useState('');
    const [infoSubtitle, setInfoSubtitle] = useState('');
    const [infoContent, setInfoContent] = useState('');
    const [infoSubtitle2, setInfoSubtitle2] = useState('');
    const [infoContent2, setInfoContent2] = useState('');
    const [infoSubtitle3, setInfoSubtitle3] = useState('');
    const [infoContent3, setInfoContent3] = useState('');
    const [infoImage1, setInfoImage1] = useState(null);
    const [infoImage2, setInfoImage2] = useState(null);
    const [infoImage3, setInfoImage3] = useState(null);

    useEffect(() => {
        fetch(`/api/infoPage/${infoPage}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setInfoTitle(data.title);
                    setInfoSubtitle(data.subtitle);
                    setInfoContent(data.content);
                    setInfoSubtitle2(data.subtitle2);
                    setInfoContent2(data.content2);
                    setInfoSubtitle3(data.subtitle3 || '');
                    setInfoContent3(data.content3 || '');
                    setInfoImage1(data.image1);
                    setInfoImage2(data.image2);
                    setInfoImage3(data.image3 || null);
                }
            })
            .catch(error => {
                console.error('Error fetching info page data:', error);
            });
    }, [infoPage]);

    const handleInfoPageSubmit = (e) => {
        e.preventDefault();
        const infoPageData = new FormData();
        infoPageData.append('title', infoTitle);
        infoPageData.append('subtitle', infoSubtitle);
        infoPageData.append('content', infoContent);
        infoPageData.append('subtitle2', infoSubtitle2);
        infoPageData.append('content2', infoContent2);

        if (infoPage === 'StrategicPage') {
            infoPageData.append('subtitle3', infoSubtitle3);
            infoPageData.append('content3', infoContent3);
            if (infoImage3) {
                infoPageData.append('image3', infoImage3);
            }
        }

        if (infoImage1) {
            infoPageData.append('image1', infoImage1);
        }
        if (infoImage2) {
            infoPageData.append('image2', infoImage2);
        }

        fetch(`/api/infoPage/${infoPage}`, {
            method: 'PUT',
            body: infoPageData,
        })
            .then(response => response.json())
            .then(data => {
                alert('The About page has been successfully updated.');
            })
            .catch(error => {
                console.error('Error updating info page:', error);
                alert('An error occurred while updating the About page.');
            });
    };

    return (
        <div style={styles.container}>
            <h2>Edit Info Page</h2>
            <form onSubmit={handleInfoPageSubmit}>
                <div style={styles.formGroup}>
                    <label>Select Page</label>
                    <select
                        value={infoPage}
                        onChange={e => setInfoPage(e.target.value)}
                        style={styles.select}
                    >
                        <option value="BusinessFundingPage">Business Funding Page</option>
                        <option value="StrategicPage">Strategic Digital Marketing Page</option>
                        <option value="TendersPage">Tenders Page</option>
                    </select>
                </div>
                <InputField label="Title" value={infoTitle} onChange={setInfoTitle} />
                <InputField label="Subtitle" value={infoSubtitle} onChange={setInfoSubtitle} />
                <TextArea label="Content" value={infoContent} onChange={setInfoContent} />
                <InputField label="Subtitle 2" value={infoSubtitle2} onChange={setInfoSubtitle2} />
                <TextArea label="Content 2" value={infoContent2} onChange={setInfoContent2} />
                {infoPage === 'StrategicPage' && (
                    <>
                        <InputField label="Subtitle 3" value={infoSubtitle3} onChange={setInfoSubtitle3} />
                        <TextArea label="Content 3" value={infoContent3} onChange={setInfoContent3} />
                        <FileInput label="Add Image 3" onChange={(e) => setInfoImage3(e.target.files[0])} />
                    </>
                )}
                <FileInput label="Add Image 1" onChange={(e) => setInfoImage1(e.target.files[0])} />
                <FileInput label="Add Image 2" onChange={(e) => setInfoImage2(e.target.files[0])} />
                <button type="submit" style={styles.submitButton}>Update Info Page</button>
            </form>
        </div>
    );
}

function InputField({ label, value, onChange }) {
    return (
        <div style={styles.formGroup}>
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={styles.input}
            />
        </div>
    );
}

function TextArea({ label, value, onChange }) {
    return (
        <div style={styles.formGroup}>
            <label>{label}</label>
            <textarea
                value={value}
                onChange={e => onChange(e.target.value)}
                style={styles.textarea}
            />
        </div>
    );
}

function FileInput({ label, onChange }) {
    return (
        <div style={styles.formGroup}>
            <label>{label}</label>
            <input
                type="file"
                accept="image/*"
                onChange={onChange}
                style={styles.inputFile}
            />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    formGroup: {
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    inputFile: {
        margin: '5px 0',
    },
    select: {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default EditInfoPage;
