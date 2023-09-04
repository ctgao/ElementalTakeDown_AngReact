import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDamage } from 'app/shared/model/damage.model';
import { DmgElementType } from 'app/shared/model/enumerations/dmg-element-type.model';
import { getEntity, updateEntity, createEntity, reset } from './damage.reducer';

export const DamageUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const damageEntity = useAppSelector(state => state.damage.entity);
  const loading = useAppSelector(state => state.damage.loading);
  const updating = useAppSelector(state => state.damage.updating);
  const updateSuccess = useAppSelector(state => state.damage.updateSuccess);
  const dmgElementTypeValues = Object.keys(DmgElementType);

  const handleClose = () => {
    navigate('/damage');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...damageEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          dmgElement: 'WATER',
          splashElement: 'WATER',
          ...damageEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="elementaltakedownApp.damage.home.createOrEditLabel" data-cy="DamageCreateUpdateHeading">
            <Translate contentKey="elementaltakedownApp.damage.home.createOrEditLabel">Create or edit a Damage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="damage-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('elementaltakedownApp.damage.name')}
                id="damage-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('elementaltakedownApp.damage.dmgValue')}
                id="damage-dmgValue"
                name="dmgValue"
                data-cy="dmgValue"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('elementaltakedownApp.damage.dmgElement')}
                id="damage-dmgElement"
                name="dmgElement"
                data-cy="dmgElement"
                type="select"
              >
                {dmgElementTypeValues.map(dmgElementType => (
                  <option value={dmgElementType} key={dmgElementType}>
                    {translate('elementaltakedownApp.DmgElementType.' + dmgElementType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('elementaltakedownApp.damage.splashDmg')}
                id="damage-splashDmg"
                name="splashDmg"
                data-cy="splashDmg"
                type="text"
              />
              <ValidatedField
                label={translate('elementaltakedownApp.damage.splashElement')}
                id="damage-splashElement"
                name="splashElement"
                data-cy="splashElement"
                type="select"
              >
                {dmgElementTypeValues.map(dmgElementType => (
                  <option value={dmgElementType} key={dmgElementType}>
                    {translate('elementaltakedownApp.DmgElementType.' + dmgElementType)}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/damage" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DamageUpdate;
