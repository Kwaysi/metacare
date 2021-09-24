import { Router } from 'express';
import Characters from './characters.service';
import { success, toFeetAndInches, validate } from '../common/utils';
import { getCharactersRules } from './characters.validation';

const router = Router();

router.get('/', getCharactersRules(), validate, async (req, res, next) => {
  try {
    const {
      query: { sort, sortOrder = 'ASC', filter },
    } = req;

    let value = [];

    value = await Characters.getCharacterList().catch((e) => {
      throw e;
    });

    // @ts-ignore
    if (filter) value = value.filter((e) => e.gender.toLowerCase() === filter.toLowerCase());

    if (sort === 'name') {
      value =
        sortOrder === 'ASC'
          ? value.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
          : value.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
    }

    if (sort === 'height')
      value =
        sortOrder === 'ASC'
          ? value.sort((a, b) => Number(a.height) - Number(b.height))
          : value.sort((a, b) => Number(b.height) - Number(a.height));

    const heightInCM =
      value.reduce((p, c) => p + (Number(c.height) ? Number(c.height) : 0), 0) || 0;
    const heightInFeet = toFeetAndInches(heightInCM);

    return res.status(200).json(
      success('Characters retrieved successfully', value, {
        heightInCM,
        heightInFeet,
        total: value.length,
      })
    );
  } catch (e) {
    return next(e);
  }
});

export default router;
