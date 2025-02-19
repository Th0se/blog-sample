/** @format */

// Library imports
import { Link } from '@remix-run/react';

// Type imports
import type { FunctionComponent } from 'react';

const CategoriesIndex: FunctionComponent = () => {
    return (
        <div>
            <div className='collapse border-accent border-solid border-2 my-2'>
                <input type='checkbox' />
                <div className='collapse-title text-accent text-center'>
                    Plants
                </div>
                <div className='collapse-content grid grid-cols-2 max-w-[20rem]'>
                    <Link
                        to='/categories/plants/succulents/1'
                        className='link link-secondary'
                    >
                        Succulents
                    </Link>
                    <Link
                        to='/categories/plants/orchids/1'
                        className='link link-secondary'
                    >
                        Orchids
                    </Link>
                    <Link
                        to='/categories/plants/annuals/1'
                        className='link link-secondary'
                    >
                        Annuals
                    </Link>
                    <Link
                        to='/categories/plants/biennials'
                        className='link link-secondary'
                    >
                        Biennials
                    </Link>
                    <Link
                        to='/categories/plants/vines/1'
                        className='link link-secondary'
                    >
                        Vines
                    </Link>
                    <Link
                        to='/categories/plants/herbs/1'
                        className='link link-secondary'
                    >
                        Herbs
                    </Link>
                </div>
            </div>
            <div className='collapse border-accent border-solid border-2 my-2'>
                <input type='checkbox' />
                <div className='collapse-title text-accent text-center'>
                    Meals
                </div>
                <div className='collapse-content grid grid-cols-2 max-w-[20rem]'>
                    <Link
                        to='/categories/meals/boiled/1'
                        className='link link-secondary'
                    >
                        Boiled
                    </Link>
                    <Link
                        to='/categories/meals/fried/1'
                        className='link link-secondary'
                    >
                        Fried
                    </Link>
                    <Link
                        to='/categories/meals/baked/1'
                        className='link link-secondary'
                    >
                        Baked
                    </Link>
                    <Link
                        to='/categories/meals/grilled/1'
                        className='link link-secondary'
                    >
                        Grilled
                    </Link>
                    <Link
                        to='/categories/meals/raw/1'
                        className='link link-secondary'
                    >
                        Raw
                    </Link>
                    <Link
                        to='/categories/meals/roasted/1'
                        className='link link-secondary'
                    >
                        Roasted
                    </Link>
                    <Link
                        to='/categories/meals/steamed/1'
                        className='link link-secondary'
                    >
                        Steamed
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoriesIndex;
