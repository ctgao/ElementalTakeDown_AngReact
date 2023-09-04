import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUltimateATK } from 'app/shared/model/ultimate-atk.model';
import { getEntities } from './ultimate-atk.reducer';

export const UltimateATK = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const ultimateATKList = useAppSelector(state => state.ultimateATK.entities);
  const loading = useAppSelector(state => state.ultimateATK.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ultimate-atk-heading" data-cy="UltimateATKHeading">
        <Translate contentKey="elementaltakedownApp.ultimateATK.home.title">Ultimate ATKS</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="elementaltakedownApp.ultimateATK.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ultimate-atk/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="elementaltakedownApp.ultimateATK.home.createLabel">Create new Ultimate ATK</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ultimateATKList && ultimateATKList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="elementaltakedownApp.ultimateATK.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.ultimateATK.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.ultimateATK.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.ultimateATK.requiredEnergy">Required Energy</Translate>
                </th>
                <th>
                  <Translate contentKey="elementaltakedownApp.ultimateATK.damage">Damage</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ultimateATKList.map((ultimateATK, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ultimate-atk/${ultimateATK.id}`} color="link" size="sm">
                      {ultimateATK.id}
                    </Button>
                  </td>
                  <td>{ultimateATK.name}</td>
                  <td>{ultimateATK.description}</td>
                  <td>{ultimateATK.requiredEnergy}</td>
                  <td>{ultimateATK.damage ? <Link to={`/damage/${ultimateATK.damage.id}`}>{ultimateATK.damage.name}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ultimate-atk/${ultimateATK.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ultimate-atk/${ultimateATK.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ultimate-atk/${ultimateATK.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="elementaltakedownApp.ultimateATK.home.notFound">No Ultimate ATKS found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UltimateATK;
