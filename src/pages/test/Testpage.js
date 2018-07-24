import React from 'react';
import DataTable from "../../components/DataTable/DataTable";

const TestPage = props => {
    return<div>
        <div>
            <DataTable
                name="table"
                header={[
                    1,2,3
                ]}
                bodyGroups={[
                    {
                        id: 1,
                        name: 'product',
                        data: [
                            [
                                'neco',
                                'neco ine',
                                'neco dalsie',
                            ],
                            [
                                '255',
                                '1024',
                                '42',
                            ]
                        ],
                    },
                ]}
            />
            <br/>
        </div>
    </div>;
};

export default TestPage;