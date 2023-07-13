import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";
import styles from './InputForm.module.scss';

export default function InputForm({ handleChange, handleSubmit, searchResult, handleSelect }) {

    const input = document.getElementById('hdrnpt');

    const handleClick = (e) => {
        if (!input.classList.contains(styles.input_active)) {
            input.focus();
            input.classList.add(styles.input_active);
        } else if (input.value) {
            handleSubmit(e);
        }
    }

    const handleBlur = (e) => {
        input.classList.remove(styles.input_active);
    }

    return (
        <div className={styles.formContainer}>
            <form id='hdrfrm' onSubmit={handleSubmit} autoComplete="off" onBlur={handleBlur}>
                <Combobox aria-label="q" onSelect={handleSelect}>
                    <ComboboxInput id="hdrnpt" onChange={handleChange} className={styles.input}/>
                    {searchResult &&
                        <ComboboxPopover className={styles.popover} style={{width: 220}}>
                            <ComboboxList className={styles.list}>
                                {searchResult.map((elem, id) => {
                                    return <ComboboxOption id={id} className={styles.option} key={id} value={`${elem.name}, ${elem.state? elem.state + ', ' : ''}${elem.country}`}>{elem.name}, {elem.state ? elem.state + ', ' : ''}{elem.country}</ComboboxOption>
                                })}</ComboboxList>
                        </ComboboxPopover>
                    }
                </Combobox>
                <button id='hdrbtn' type='button' className={styles.button} onClick={handleClick}></button>
            </form>
        </div>
    )
}