'use client'
import { Button, RadioGroup, TextArea, TextField, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import React from 'react'
import type { Job } from '../models/Job';
import {
   CitySelect,
   CountrySelect,
   StateSelect,
   LanguageSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { redirect } from 'next/navigation';
import { faEnvelope, faPhone, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImageUpload from './ImageUpload';
import { saveJobActions } from '../actions/saveJobActions';

const JobForm = ({ orgId, jobDoc }: { orgId: string; jobDoc?: Job }) => {

   const [countryId, setCountryId] = React.useState(jobDoc?.countryId || 0);
   const [stateId, setStateId] = React.useState(jobDoc?.stateId || 0);
   const [cityId, setCityId] = React.useState(jobDoc?.cityId || null);
   const [countryName, setCountryName] = React.useState(jobDoc?.country || '');
   const [stateName, setStateName] = React.useState(jobDoc?.state || '');
   const [cityName, setCityName] = React.useState(jobDoc?.city || '');
   const handleAddJob = async (data: FormData) => {
      data.set('country', countryName.toString());
      data.set('state', stateName.toString());
      data.set('city', cityName.toString());
      data.set('countryId', countryId.toString());
      data.set('stateId', stateId.toString());
      data.set('cityId', cityId ? cityId.toString() : '');
      data.set('orgId', orgId);
      const jobIcon = data.get('jobIcon') as string;
      if (!jobIcon) {
        data.set('jobIcon', jobDoc?.jobIcon || '');
      }
    
      const contactPhoto = data.get('contactPhoto') as string;
      if (!contactPhoto) {
        data.set('contactPhoto', jobDoc?.contactPhoto || '');
      }
    
      // Save the job document
      const savedJobDoc = await saveJobActions(data);
      redirect(`/jobs/${savedJobDoc.orgId}`);
   }
   console.log('ddddddd', FormData);
 
   


   return (

      <Theme>
         <form action={handleAddJob} className="container mt-6 flex flex-col gap-4">
            {jobDoc && (
               <input type="hidden" name="id" required value={jobDoc?._id} />
            )}
            <TextField.Root name="title" placeholder="Job title" required defaultValue={jobDoc?.title || ''} />
            <div className="grid sm:grid-cols-3 gap-6 *:grow">
               <div>
                  Remote?
                  <RadioGroup.Root required defaultValue={jobDoc?.remote || 'hybrid'} name="remote">
                     <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
                     <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
                     <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
                  </RadioGroup.Root>
               </div>
               <div>
                  Full time?
                  <RadioGroup.Root required defaultValue={jobDoc?.type || 'full'} name="type">
                     <RadioGroup.Item value="project">Project</RadioGroup.Item>
                     <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
                     <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
                  </RadioGroup.Root>
               </div>
               <div>
                  Salary
                  <TextField.Root name="salary" required defaultValue={jobDoc?.salary || ''}>
                     <TextField.Slot>
                        $
                     </TextField.Slot>
                     <TextField.Slot>
                        k/year
                     </TextField.Slot>
                  </TextField.Root>
               </div>
            </div>
            <div>
               Location
               <div className="flex flex-col sm:flex-row gap-4 *:grow">
                  <CountrySelect
                     defaultValue={countryId ? { id: countryId, name: countryName } : 0}
                     onChange={(e: any) => {
                        setCountryId(e.id);
                        setCountryName(e.name);
                     }}
                     placeHolder="Select Country"
                  />
                  <StateSelect
                     defaultValue={stateId ? { id: stateId, name: stateName } : 0}
                     countryid={countryId}
                     onChange={(e: any) => {
                        setStateId(e.id);
                        setStateName(e.name);
                     }}
                     placeHolder="Select State"
                  />
                  <CitySelect
                     defaultValue={cityId ? { id: cityId, name: cityName } : null} // Use `null` for no selection
                     countryid={countryId}
                     stateid={stateId}
                     onChange={(e: any) => {
                        if (e) {
                           setCityId(e.id);
                           setCityName(e.name);
                        } else {
                           setCityId(null); // Reset to `null` if no city is selected
                           setCityName('');
                        }
                     }}
                     placeHolder="Select City (Optional)" // Indicate that this field is optional
                  />

               </div>

            </div>
            <div className="sm:flex">
               <div className="w-1/3">
                  <h3>Job icon</h3>
                  <ImageUpload  name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''} />
               </div>
               <div className="grow">
                  <h3>Contact person</h3>
                  <div className="flex gap-2">
                     <div className="">
                        <ImageUpload  name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || ''} />
                     </div>
                     <div className="grow flex flex-col gap-1">
                        <TextField.Root
                           placeholder="John Doe"
                           name="contactName"
                           defaultValue={jobDoc?.contactName || ''}>
                           <TextField.Slot>
                              <FontAwesomeIcon icon={faUser} />
                           </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                           placeholder="Phone"
                           type="tel"
                           name="contactPhone"
                           defaultValue={jobDoc?.contactPhone || ''}
                        >
                           <TextField.Slot>
                              <FontAwesomeIcon icon={faPhone} />
                           </TextField.Slot>
                        </TextField.Root>
                        <TextField.Root
                           placeholder="Email"
                           type="email"
                           name="contactEmail"
                           defaultValue={jobDoc?.contactEmail || ''}
                        >
                           <TextField.Slot>
                              <FontAwesomeIcon icon={faEnvelope} />
                           </TextField.Slot>
                        </TextField.Root>
                     </div>
                  </div>
               </div>
            </div>
            <TextArea
               defaultValue={jobDoc?.description || ''}
               placeholder="Job description"
               resize="vertical"
               name="description" />
            <div className="flex justify-center">
               <Button   size="3">
                  <span  className="px-8 cursor-pointer">Save</span>
               </Button>
            </div>
         </form>
      </Theme>

   )
}

export default JobForm