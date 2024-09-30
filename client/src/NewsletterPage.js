import React, { useState, useEffect } from 'react';
import { Cascader, Button, Input, Form, Row, Col } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MyCustomQuillStyles.css';
const NewsletterPage = () => {
    const [options, setOptions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [formData, setFormData] = useState({
        subject: '',
        html: '',
    });

    useEffect(() => {
        fetch('/api/newsletter/categories')
            .then(response => response.json())
            .then(data => {
                const categories = data.data.map(category => ({
                    value: category.CategoryId,
                    label: category.CategoryName,
                    children: [],
                }));
                setOptions(categories);

                fetch('/api/newsletter/users/by-category')
                    .then(response => response.json())
                    .then(data => {
                        const usersByCategory = data.data;
                        const newOptions = categories.map(category => ({
                            ...category,
                            children: usersByCategory[category.label].map(user => ({
                                value: user.Email,
                                label: `${user.FirstName} ${user.LastName}`
                            }))
                        }));
                        setOptions(newOptions);
                    });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const onChange = (value, selectedOptions) => {
        let emails = [];

        value.forEach(path => {
            if (path.length === 1) {
                // Category selected
                const categoryId = path[0];
                const categoryOption = options.find(option => option.value === categoryId);
                if (categoryOption && categoryOption.children) {
                    categoryOption.children.forEach(child => {
                        emails.push(child.value);
                    });
                }
            } else if (path.length === 2) {
                // User selected
                const userEmail = path[1];
                emails.push(userEmail);
            }
        });

        // Remove duplicates
        emails = [...new Set(emails)];

        setSelectedUsers(emails);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const bodyContent = {
            ...formData,
            recipients: selectedUsers,
        };

        fetch('/api/newsletter/send-newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
        })
            .then(response => response.json())
            .then(data => {
                alert('Newsletter sent to selected users!');
            })
            .catch(error => {
                console.error('Error sending newsletter:', error);
            });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <div style={{ padding: 20 }}>
            <Form layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Form.Item label="Recipients">
                            <Cascader
                                style={{ width: '100%' }}
                                options={options}
                                onChange={onChange}
                                multiple
                                maxTagCount="responsive"
                                placeholder="Select Users by Category"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Subject">
                            <Input name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Message">
                            <ReactQuill
                                theme="snow"
                                value={formData.html}
                                onChange={(content) => setFormData(prev => ({...prev, html: content}))}
                                modules={modules}
                                formats={formats}
                                placeholder="Write something..."
                            />
                            <style>{`.ql-editor.ql-blank::before {padding-bottom: 100px !important;}`}</style>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Button type="primary" onClick={handleSubmit} block>
                            Send Newsletter
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};
export default NewsletterPage;
