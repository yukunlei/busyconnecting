import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarForm.css'; // Add your custom styles

function CalendarForm() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        notes: '',
    });
    const [step, setStep] = useState(1); // Step 1 is calendar, Step 2 is time selection, Step 3 is form
    const [disabledSlots, setDisabledSlots] = useState([]);

    const timeSlots = {
        morning: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
        afternoon: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM']
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setStep(2); // Move to time selection after date selection
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedTime) {
            alert('Please select a time slot.');
            return;
        }
;
        const formattedDate = selectedDate.toLocaleDateString().split('T')[0]; 

        const appointmentData = {
            date: formattedDate,
            startTime: selectedTime,
            ...formData
        };

        console.log('Submitting data:', appointmentData); // Verify date format

        fetch('/api/meeting/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        })
            .then(response => response.json())
            .then(data => {
                alert('Appointment successfully booked!');
                // Clear the form and reset the state
                setSelectedDate(new Date());
                setSelectedTime(null);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    notes: '',
                });
                setStep(1); // Reset to calendar view
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error booking your appointment.');
            });
    };

    const handleTimeSelection = async (time) => {
        const formattedDate = selectedDate.toLocaleDateString().split('T')[0];

        const isAvailable = await checkAvailability(formattedDate, time);

        if (isAvailable) {
            setSelectedTime(time);
            setStep(3); // Move to form after time selection
        } else {
            alert('The selected time slot is not available. Please choose another time.');
        }
    };

    const handleBack = () => {
        setStep(step - 1); // Go back to the previous step
    };

    const checkAvailability = async (date, time) => {
        const response = await fetch(`/api/meeting/checKAvailability?date=${date}&startTime=${time}`);
        const data = await response.json();
        return data.available;
    };

    const fetchDisabledSlots = async () => {
        const formattedDate = selectedDate.toLocaleDateString().split('T')[0];

        const slots = [...timeSlots.morning, ...timeSlots.afternoon];
        const promises = slots.map(async (time) => {
            const isAvailable = await checkAvailability(formattedDate, time);
            return isAvailable ? null : time;
        });

        const results = await Promise.all(promises);
        setDisabledSlots(results.filter(slot => slot !== null));
    };

    useEffect(() => {
        if (step === 2) {
            fetchDisabledSlots();
        }
    }, [selectedDate, step]);

    const disableNonWednesdays = ({ date, view }) => {
        if (view === 'month') {
            const dayOfWeek = date.getDay();
            return dayOfWeek !== 3; // Disable if it's not Wednesday
        }
        return false;
    };

    return (
        <div className="page-wrapper">
            {step === 1 ? (
                <div className="appointment-page-container">
                    <div className="calendar-container">
                        <h2>{selectedDate.toLocaleDateString()}</h2>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            tileDisabled={disableNonWednesdays}
                            tileClassName={({ date, view }) =>
                                view === 'month' && date.getDate() === selectedDate.getDate()
                                    ? 'highlight'
                                    : null
                            }
                        />
                    </div>
                </div>
            ) : step === 2 ? (
                <div className="appointment-page-container">
                    <div className="time-selection-container">
                        {step > 1 && (
                            <button className="back-button" onClick={handleBack}>
                                &larr;
                            </button>
                        )}
                        <h2>Select a time on {selectedDate.toLocaleDateString()}</h2>
                        <div className="time-options">
                            <div className="time-slot-column">
                                <h3>Morning</h3>
                                {timeSlots.morning.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelection(time)}
                                        disabled={disabledSlots.includes(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            <div className="time-slot-column">
                                <h3>Afternoon</h3>
                                {timeSlots.afternoon.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelection(time)}
                                        disabled={disabledSlots.includes(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="appointment-page-container">
                    <div className="form-container">
                        {step > 1 && (
                            <button className="back-button" onClick={handleBack}>
                                &larr;
                            </button>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    required
                                    style={{ width: '100%' }} // Ensure full width for notes
                                />
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarForm;
