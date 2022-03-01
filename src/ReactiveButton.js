import React, { useState } from 'react';
import ReactiveButton from 'reactive-button';



function Flash() {
    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }
    return (
        <ReactiveButton
            buttonState={state}
            onClick={onClickHandler}
            color={'yellow'}
            idleText={'Buy ZGR Tokens'}
            loadingText={'Loading'}
            successText={'Success'}
            errorText={'Error'}
            type={'button'}
            className={'class1 class2'}
            style={{ borderRadius: '5px', marginLeft: '10px', marginRight: '10px', fontWeight: 'bold' }}
            outline={false}
            shadow={false}
            rounded={false}
            size={'large'}
            block={false}
            messageDuration={2000}
            disabled={false}
            buttonRef={null}
            width={null}
            height={null}
            animation={true}
            id={'buy'}
            type={'submit'}

        />
    );
}
export default Flash;