import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";
import { useState } from 'react';
import styles from './InputForm.module.scss';
import icons from '../../../assets/sprite.svg';
import classNames from 'classnames';

const formatLocationText = (elem) => {
    return `${elem.name}, ${elem.state ? elem.state + ', ' : ''}${elem.country}`;
}

export default function InputForm({ handleChange, searchTerm, searchResult, handleSelect, handleClear, inputRef, logoRef, clearBtnRef }) {

    const [isActive, setIsActive] = useState(false);

    const handleFocus = (e) => {
        if (!isActive) {
            inputRef.current.focus();
            inputRef.current.classList.add(styles.input_active);
            inputRef.current.inputMode = 'search';
            logoRef.current.classList.add(styles.logo_active);
            setIsActive(true);
        } else if (!e.currentTarget.classList.contains(styles.search_active)) {
            return;
        }
    }

    const handleBlur = (e) => {
        if (e.relatedTarget === clearBtnRef.current) {
            inputRef.current.focus();
        } else {
            setIsActive(false);
            inputRef.current.classList.remove(styles.input_active);
            inputRef.current.inputMode = 'none';
            logoRef.current.classList.remove(styles.logo_active);
            clearBtnRef.current.classList.remove(styles.clear_active);
        }
    }

    return (
        <div className={styles.formContainer}>
            <form autoComplete="off" onBlur={handleBlur} onFocus={handleFocus}>
                <Combobox aria-label="q" onSelect={handleSelect}>
                    <ComboboxInput ref={inputRef} onChange={handleChange} className={styles.input} value={searchTerm || ''} />
                    {searchResult &&
                        <ComboboxPopover className={styles.popover} style={{ width: 220 }}>
                            <ComboboxList className={styles.list}>
                                {searchResult.length === 0 ?
                                    <ComboboxOption className={classNames(styles.option, styles.option_noresults)} value=''>No results</ComboboxOption>
                                    :
                                    searchResult.map((elem, id) => {
                                        return <ComboboxOption id={id} className={styles.option} key={id} value={formatLocationText(elem)}>{formatLocationText(elem)}</ComboboxOption>
                                    })}</ComboboxList>
                        </ComboboxPopover>
                    }
                </Combobox>
                <svg ref={clearBtnRef} role='button' viewBox="0 0 30 30" className={classNames(styles.clear, inputRef?.current?.value && isActive && styles.clear_active)} onClick={handleClear} tabIndex='-1'>
                    <use href={`${icons}#clearForm`} />
                </svg>
                <svg role='button' viewBox="0 0 30 30" className={styles.search} onClick={handleFocus} tabIndex='-1'>
                    <use href={`${icons}#search`} />
                </svg>
            </form>
        </div>
    )
}