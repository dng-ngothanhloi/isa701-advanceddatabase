import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'reactstrap';
import {Translate, ValidatedField, ValidatedForm, translate} from 'react-jhipster';
import {useSearchParams} from 'react-router-dom';
import {toast} from 'react-toastify';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import {useAppDispatch, useAppSelector} from 'app/config/store';
import {handlePasswordResetFinish, reset} from '../password-reset.reducer';

export const PasswordResetFinishPage = () => {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const key = searchParams.get('key');

    const [password, setPassword] = useState('');

    useEffect(
        () => () => {
            dispatch(reset());
        },
        [],
    );

    const handleValidSubmit = ({newPassword}) => dispatch(handlePasswordResetFinish({key, newPassword}));

    const updatePassword = event => setPassword(event.target.value);

    const getResetForm = () => {
        return (
            <ValidatedForm onSubmit={handleValidSubmit}>
                <ValidatedField
                    name="newPassword"
                    label={translate('global.form.newpassword.label')}
                    placeholder={translate('global.form.newpassword.placeholder')}
                    type="password"
                    validate={{
                        required: {value: true, message: translate('global.messages.validate.newpassword.required')},
                        minLength: {value: 4, message: translate('global.messages.validate.newpassword.minlength')},
                        maxLength: {value: 50, message: translate('global.messages.validate.newpassword.maxlength')},
                    }}
                    onChange={updatePassword}
                    data-cy="resetPassword"
                />
                <PasswordStrengthBar password={password}/>
                <ValidatedField
                    name="confirmPassword"
                    label={translate('global.form.confirmpassword.label')}
                    placeholder={translate('global.form.confirmpassword.placeholder')}
                    type="password"
                    validate={{
                        required: {
                            value: true,
                            message: translate('global.messages.validate.confirmpassword.required')
                        },
                        minLength: {value: 4, message: translate('global.messages.validate.confirmpassword.minlength')},
                        maxLength: {
                            value: 50,
                            message: translate('global.messages.validate.confirmpassword.maxlength')
                        },
                        validate: v => v === password || translate('global.messages.error.dontmatch'),
                    }}
                    data-cy="confirmResetPassword"
                />
                <Button color="success" type="submit" data-cy="submit">
                    <Translate contentKey="reset.finish.form.button">Validate new password</Translate>
                </Button>
            </ValidatedForm>
        );
    };

    const successMessage = useAppSelector(state => state.passwordReset.successMessage);

    useEffect(() => {
        if (successMessage) {
            toast.success(translate(successMessage));
        }
    }, [successMessage]);

    return (
        <div>
            <Row className="justify-content-center">
                <Col md="4">
                    <h1>
                        <Translate contentKey="reset.finish.title">Reset password</Translate>
                    </h1>
                    <div>{key ? getResetForm() : null}</div>
                </Col>
            </Row>
        </div>
    );
};

export default PasswordResetFinishPage;
