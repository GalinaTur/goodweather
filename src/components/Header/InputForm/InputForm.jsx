import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";
import { useState } from 'react';
import styles from './InputForm.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

export default function InputForm({ handleChange, searchTerm, searchResult, handleSelect, handleClear, inputRef, logoRef, clearBtnRef }) {

const [isActive, setIsActive] = useState(false);

    const handleFocus = (e) => {
        if (!isActive) {
            inputRef.current.focus();
            inputRef.current.classList.add(styles.input_active);
            logoRef.current.classList.add(styles.logo_active);
            setIsActive(true);
        } 
        if (inputRef.current.value !== '') {
            clearBtnRef.current.classList.add(styles.clear_active);
        }
    }

    const handleBlur = (e) => {
        setIsActive(false);
        inputRef.current.classList.remove(styles.input_active);
        logoRef.current.classList.remove(styles.logo_active);
    }

console.log(searchResult)

    return (
        <div className={styles.formContainer}>
            <form autoComplete="off" onBlur={handleBlur} onFocus={handleFocus}>
                <Combobox aria-label="q" onSelect={handleSelect}>
                    <ComboboxInput ref={inputRef} onChange={handleChange} className={styles.input} value={searchTerm || ''}/>
                    {searchResult && 
                        <ComboboxPopover className={styles.popover} style={{ width: 220 }}>
                            <ComboboxList className={styles.list}>
                                { searchResult.length === 0 ? 
                                <ComboboxOption className={classNames(styles.option, styles.option_noresults)} value={'No results'}>No results</ComboboxOption>
                                :
                                    searchResult.map((elem, id) => {
                                    return <ComboboxOption id={id} className={styles.option} key={id} value={`${elem.name}, ${elem.state ? elem.state + ', ' : ''}${elem.country}`}>{elem.name}, {elem.state ? elem.state + ', ' : ''}{elem.country}</ComboboxOption>
                                })}</ComboboxList>
                        </ComboboxPopover>
                    }
                </Combobox>
                <svg ref={clearBtnRef} width='30' height='30' role='button' viewBox="0 0 30 30" className={classNames(styles.clear, inputRef.current?.value && styles.clear_active)} onClick={handleClear}>
                    <use href={`${icons}#clearForm`} />
                </svg>
                <svg width='30' height='30' role='button' viewBox="0 0 30 30" className={styles.search} onClick={handleFocus}>
                    <use href={`${icons}#search`} />
                </svg>
            </form>
        </div>
    )
}