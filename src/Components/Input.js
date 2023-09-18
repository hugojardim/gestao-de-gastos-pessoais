import styles from './Input.module.css'

function Input({id, label, ...props}) {

    return(
        <div className={styles.inputDiv}>
            <label htmlFor={id}>{label}</label>
            <input className={styles.inputLogin} id={id} type="text" {...props}></input>
        </div>
    );
}

export default Input;
