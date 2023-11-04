import { searchPlaceRepository } from './searchPlaceRepository'
import { searchResultRepository } from './searchResultRepository'
import { searchDetailRepository } from './searchDetailRepository'
import { paymentRepository } from './paymentRepository'
import { reservationRepository } from './reservationRepository'
import { authRepository } from './authRepository'

const repositories = {
  searchPlace: searchPlaceRepository,
  searchResult: searchResultRepository,
  searchDetail: searchDetailRepository,
  payment: paymentRepository,
  reservation: reservationRepository,
  auth: authRepository
}

export const repositoryFactory = {
  get: (name) => repositories[name]
}
