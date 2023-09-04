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
import { IBasicATK } from 'app/shared/model/basic-atk.model';
import { getEntity, updateEntity, createEntity, reset } from './basic-atk.reducer';

export const BasicATKUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const damages = useAppSelector(state => state.damage.entities);
  const basicATKEntity = useAppSelector(state => state.basicATK.entity);
  const loading = useAppSelector(state => state.basicATK.loading);
  const updating = useAppSelector(state => state.basicATK.updating);
  const updateSuccess = useAppSelector(state => state.basicATK.updateSuccess);

  const handleClose = () => {
    navigate('/basic-atk');
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
      ...basicATKEntity,
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
          ...basicATKEntity,
          damage: basicATKEntity?.damage?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="elementaltakedownApp.basicATK.home.createOrEditLabel" data-cy="BasicATKCreateUpdateHeading">
            <Translate contentKey="elementaltakedownApp.basicATK.home.createOrEditLabel">Create or edit a BasicATK</Translate>
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
                  id="basic-atk-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('elementaltakedownApp.basicATK.name')}
                id="basic-atk-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                label={translate('elementaltakedownApp.basicATK.description')}
                id="basic-atk-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="basic-atk-damage"
                name="damage"
                data-cy="damage"
                label={translate('elementaltakedownApp.basicATK.damage')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/basic-atk" replace color="info">
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

export default BasicATKUpdate;
