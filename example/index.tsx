import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Box,
  Button,
  ChakraProvider,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { SingleDatepicker, RangeDatepicker } from '../src';
import { useState } from 'react';
import { DatepickerConfigs } from '../src/utils/commonTypes';
import { Weekday_Names_Short } from '../src/utils/calanderUtils';

type FirstDayOfWeek = DatepickerConfigs['firstDayOfWeek'];
const offsets: FirstDayOfWeek[] = [0, 1, 2, 3, 4, 5, 6];

const App = () => {
  const [date, setDate] = useState(new Date('07/28/2022'));
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<FirstDayOfWeek>(1);
  return (
    <ChakraProvider>
      <VStack
        padding={'1em'}
        spacing={5}
        minHeight={'600px'}
        alignItems="flex-start"
      >
        <Heading>Single:</Heading>
        <SingleDatepicker
          name="date-input"
          date={date}
          minDate={new Date('07/25/2022')}
          maxDate={new Date('08/05/2022')}
          onDateChange={setDate}
        />
        <Heading>Range:</Heading>
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
        />
        <Heading>Custom Styles:</Heading>
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          propsConfigs={{
            dateNavBtnProps: {
              colorScheme: 'blue',
              variant: 'outline',
            },
            dayOfMonthBtnProps: {
              defaultBtnProps: {
                borderColor: 'red.300',
                _hover: {
                  background: 'blue.400',
                },
              },
              isInRangeBtnProps: {
                color: 'purple.800',
                borderColor: 'blue.300',
              },
              selectedBtnProps: {
                background: 'blue.200',
                borderColor: 'blue.300',
                color: 'blue.600',
              },
              todayBtnProps: {
                background: 'teal.200',
                color: 'teal.700',
              },
            },
            inputProps: {
              size: 'sm',
            },
          }}
        />
        <Heading>Custom Month/Weekday/Format:</Heading>
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          configs={{
            dateFormat: 'yyyy-MM-dd',
            dayNames: 'abcdefg'.split(''), // length of 7
            monthNames: 'ABCDEFGHIJKL'.split(''), // length of 12
            firstDayOfWeek: 0,
          }}
        />
        <Heading>With Offset:</Heading>
        <Box>First Day of Week: {Weekday_Names_Short[firstDayOfWeek || 0]}</Box>
        <HStack spacing={1}>
          {offsets.map((e) => (
            <Button
              key={e}
              onClick={() => setFirstDayOfWeek(e)}
              backgroundColor={firstDayOfWeek === e ? 'green.300' : undefined}
            >
              {e}
            </Button>
          ))}
        </HStack>
        <SingleDatepicker
          name="date-input"
          date={date}
          onDateChange={setDate}
          configs={{
            firstDayOfWeek,
          }}
        />
        <RangeDatepicker
          selectedDates={selectedDates}
          onDateChange={setSelectedDates}
          configs={{
            firstDayOfWeek: 1,
          }}
        />
      </VStack>
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
