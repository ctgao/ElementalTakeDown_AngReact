import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDamage } from 'app/shared/model/damage.model';
import { getEntities as getDamages } from 'app/entities/damage/damage.reducer';
import { IUltimateATK } from 'app/shared/model/ultimate-atk.model';
import { getEntity, updateEntity, createEntity, reset } from './ultimate-atk.reducer';

export const UltimateATKUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const damages = useAppSelector(state => state.damage.entities);
  const ultimateATKEntity = useAppSelector(state => state.ultimateATK.entity);
  const loading = useAppSelector(state => state.ultimateATK.loading);
  const updating = useAppSelector(state => state.ultimateATK.updating);
  const updateSuccess = useAppSelector(state => state.ultimateATK.updateSuccess);

  const handleClose = () => {
    navigate('/ultimate-atk');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDamages({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...ultimateATKEntity,
      ...values,
      damage: damages.find(it => it.id.toString() === values.damage.toString()),
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
          ...ultimateATKEntity,
          damage: ultimateATKEntity?.damage?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="elementaltakedownApp.ultimateATK.home.createOrEditLabel" data-cy="UltimateATKCreateUpdateHeading">
            <Translate contentKey="elementaltakedownApp.ultimateATK.home.createOrEditLabel">Create or edit a UltimateATK</Translate>
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
                  id="ultimate-atk-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('elementaltakedownApp.ultimateATK.name')}
                id="ultimate-atk-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('elementaltakedownApp.ultimateATK.description')}
                id="ultimate-atk-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('elementaltakedownApp.ultimateATK.requiredEnergy')}
                id="ultimate-atk-requiredEnergy"
                name="requiredEnergy"
                data-cy="requiredEnergy"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="ultimate-atk-damage"
                name="damage"
                data-cy="damage"
                label={translate('elementaltakedownApp.ultimateATK.damage')}
                type="select"
                required
              >
                <option value="" key="0" />
                {damages
                  ? damages.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ultimate-atk" replace color="info">
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

export default UltimateATKUpdate;
