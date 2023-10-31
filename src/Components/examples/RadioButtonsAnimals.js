import React, {useEffect} from 'react';
const RadioButtonsAnimals = () => {
    const [favorite, setFavorite] = React.useState('dog');

    const handleCatChange = () => {
        setFavorite('cat');
    };

    const handleDogChange = () => {
        setFavorite('dog');
    };

    useEffect(() => {
        
    }, [favorite]);

    return (
        <div>
            <RadioButton
                label="Cat"
                value={favorite === 'cat'}
                onChange={handleCatChange}
            />
            <RadioButton
                label="Dog"
                value={favorite === 'dog'}
                onChange={handleDogChange}
            />
        </div>
    );
};

const RadioButton = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="radio" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default RadioButtonsAnimals;