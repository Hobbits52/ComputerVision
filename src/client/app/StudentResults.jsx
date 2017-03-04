import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import css from '../css/auth.css';

class StudentResults extends React.Component {
  render() {
    return (
      <div className="studentResults">
        <h3>Rachel's Results: 82%</h3>
        <h3>BIO 101: Midterm 1</h3>
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>A</td>
              <td>A</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>2</td>
              <td>C</td>
              <td>C</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>3</td>
              <td>B</td>
              <td>B</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>4</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>5</td>
              <td>E</td>
              <td>D</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>6</td>
              <td>D</td>
              <td>C</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>7</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>8</td>
              <td>B</td>
              <td>B</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>9</td>
              <td>C</td>
              <td>C</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>10</td>
              <td>D</td>
              <td>C</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>11</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>12</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>13</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>14</td>
              <td>B, C, D, E</td>
              <td>C, E</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>15</td>
              <td>A, B</td>
              <td>A, B</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>16</td>
              <td>A</td>
              <td>A</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>17</td>
              <td>C, D</td>
              <td>C, D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>18</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>19</td>
              <td>E</td>
              <td>E</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>20</td>
              <td>B</td>
              <td>C</td>
              <td>❌</td>
            </tr>
            <tr>
              <td>21</td>
              <td>A</td>
              <td>A</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>22</td>
              <td>C</td>
              <td>C</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>23</td>
              <td>C</td>
              <td>C</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>24</td>
              <td>B</td>
              <td>B</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>25</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>26</td>
              <td>D</td>
              <td>D</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>27</td>
              <td>C</td>
              <td>C</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>28</td>
              <td>E</td>
              <td>E</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentResults;
